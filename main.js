const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
const username = require('username');
const https = require('https');

require('electron-reload')(__dirname);
require('dotenv').config();

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
		resizable: resizable,
		maximizable: maximizable,
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
		win.on("blur", function() {
			win.focus();
		});

		win.on("leave-full-screen", function() {
			win.setFullScreen(true);
		});

		win.on("resize", function() {
			setTimeout(function() {
				win.reload();
			}, 1000);
		});
	}
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
		
		response.on('data', function(d) {
			data += d;
		});
		
		response.on('end', function() {
			var json = JSON.parse(data);
			//console.log("get-raspicam-stats", json);
			win.webContents.send("set-raspicam-stats", json);
		});

		response.on('error', function(err){
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

	for(var i = 0, len = cpus.length; i < len; i++) {
		//console.log("CPU %s:", i);
		win.webContents.send("set-os-cpu-stats", i);
		var cpu = cpus[i], total = 0;

		for(var type in cpu.times) {
			total += cpu.times[type];
		}

		for(type in cpu.times) {
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