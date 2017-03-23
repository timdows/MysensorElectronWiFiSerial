const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
const username = require('username');
const https = require('https');
const schedule = require('node-schedule');

require('electron-reload')(__dirname);
require('dotenv').config();

let SerialPort = null;
let scp = null;
if (process.env.ENVIRONMENT === 'pi') {
	console.log("Environment: Pi");
	SerialPort = require('serialport');
	scp = require('scp');
}

let win = null;

app.on('ready', function () {
	frame = false;
	maximizable = false;
	resizable = false;
	openDevTools = false;
	fullscreen = true;
	autoHideMenuBar = true;

	if (process.argv[2] == "dev") {
		frame = true;
		maximizable = true;
		resizable = true;
		openDevTools = true;
		fullscreen = false;
		autoHideMenuBar = false;
	}

	// Initialize the window to our specified dimensions
	win = new BrowserWindow({
		//width: 800, 
		//height: 480,
		//resizable: resizable,
		//maximizable: maximizable,
		fullscreen: fullscreen,
		frame: frame,
		autoHideMenuBar: autoHideMenuBar
	});

	// Specify entry point
	if (process.env.PACKAGE === 'true') {
		win.loadURL(url.format({
			pathname: path.join(__dirname, 'dist/index.html'),
			protocol: 'file:',
			slashes: true
		}));
	} else {
		win.loadURL(process.env.HOST);
	}

	if (openDevTools) {
		win.webContents.openDevTools();
	}

	// Remove window once app is closed
	win.on('closed', function () {
		win = null;
	});

	if (process.env.PACKAGE === 'true') {
		win.on("blur", function () {
			win.focus();
		});

		win.on("leave-full-screen", function () {
			win.setFullScreen(true);
		});

		win.on("resize", function () {
			setTimeout(function () {
				win.reload();
			}, 1000);
		});
	}

	// Part that only runs on the pi itself
	if (process.env.ENVIRONMENT === 'pi') {
		var port = new SerialPort('/dev/serial0', {
			baudRate: 9600,
			parser: SerialPort.parsers.readline('\n')
		});

		port.on('open', function () { });
		port.on('error', function (err) {
			console.log("SerialPort error:", err.message);
		});

		port.on('data', function (data) {
			//console.log("SerialPort data:", data);
			win.webContents.send("push-serialdata", data);
		});

		var j = schedule.scheduleJob('* * * * *', function () {
			console.log('cron fired!');
			win.webContents.send("execute-vera-export");
		});
	}
});

ipcMain.on("download-datamine-database", (event, settings) => {
	console.log("download-datamine-database", settings);
	// client.scp({
	// 	host: settings.veraIpAddress,
	// 	username: settings.username,
	// 	password: settings.password,
	// 	path: '/usbdisk/dataMine/sunriseSunset.txt'
	// }, './', function(err) {
	// 	console.log(err);
	// });

	// var client = new Client({
	// 	port: 22,
	// 	host: settings.veraIpAddress,
	// 	username: settings.username,
	// 	password: settings.password
	// });
	// });


	scp.get({
		file: '/usbdisk/dataMine/sunriseSunset.txt', // remote file to grab
		user: settings.username,   // username to authenticate as on remote system
		host: settings.veraIpAddress,   // remote host to transfer from, set up in your ~/.ssh/config
		port: '22',         // remote port, optional, defaults to '22'
		path: '~'           // local path to save to (this would result in a ~/file.txt on the local machine)
	});
});

ipcMain.on("get-raspicam-stats", (event, arg) => {
	// console.log("get-raspicam-stats");

	https.get({
		host: '10.0.0.27',
		port: 3000,
		path: '/api?action=loadStatus',
		auth: 'timelapse:timelapse',
		rejectUnauthorized: false
	}, function (response) {
		var data = '';

		response.on('data', function (d) {
			data += d;
		});

		response.on('end', function () {
			var json = JSON.parse(data);
			//console.log("get-raspicam-stats", json);
			win.webContents.send("set-raspicam-stats", json);
		});

		response.on('error', function (err) {
			console.log("get-raspicam-stats error: " + err.message);
		});
	});
});

ipcMain.on("get-os-content", (event, arg) => {
	var content = {
		hostname: os.hostname(),
		type: os.type(),
		platform: os.platform(),
		arch: os.arch(),
		release: os.release(),
		uptime: os.uptime(),
		loadavg: os.loadavg(),
		totalmem: os.totalmem(),
		freemem: os.freemem(),
		cpus: os.cpus(),
		networkInterfaces: os.networkInterfaces(),
		username: username.sync()
	};

	win.webContents.send("set-os-content", content);
});

ipcMain.on("get-os-cpu-stats", (event, arg) => {
	//console.log("get-os-cpu-stats", arg);
	var cpus = os.cpus();

	for (var i = 0, len = cpus.length; i < len; i++) {
		//console.log("CPU %s:", i);
		win.webContents.send("set-os-cpu-stats", i);
		var cpu = cpus[i], total = 0;

		for (var type in cpu.times) {
			total += cpu.times[type];
		}

		for (type in cpu.times) {
			//console.log("\t", type, Math.round(100 * cpu.times[type] / total));
			win.webContents.send("set-os-cpu-stats", type);
		}
	}
});

ipcMain.on("close-electron", (event, arg) => {
	app.quit();
});

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
});

app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

process.on('uncaughtException', function (err) {
	console.log("uncaughtException", err);
}); 