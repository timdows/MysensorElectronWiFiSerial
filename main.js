const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');
const username = require('username');
//const http = require('http');
const http = require('http'), superagent = require('superagent');
const https = require('https');
const schedule = require('node-schedule');
const zipdir = require('zip-dir');
const FormData = require('form-data');
const rimraf = require('rimraf');
const SSH = require('simple-ssh');
var qs = require("querystring");

require('electron-reload')(__dirname);
require('dotenv').config();

//let SerialPort = null;
let scp = null;
if (process.env.ENVIRONMENT === 'pi') {
	console.log("Environment: Pi");
	//SerialPort = require('serialport');
	scp = require('./scp.js');
}

let win = null;
let jsonSynology = null;

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
		// var port = new SerialPort('/dev/serial0', {
		// 	baudRate: 9600,
		// 	parser: SerialPort.parsers.readline('\n')
		// });

		// port.on('open', function () { });
		// port.on('error', function (err) {
		// 	console.log("SerialPort error:", err.message);
		// });

		// port.on('data', function (data) {
		// 	//console.log("SerialPort data:", data);
		// 	win.webContents.send("push-serialdata", data);
		// });

		// Set a job at 1 every night
		var scheduleVeraDatabaseExport = schedule.scheduleJob('0 1 * * *', function () {
			console.log('execute-vera-database-export cron fired!');
			win.webContents.send("execute-vera-database-export");
		});
	}

	var scheduleVeraValuesExport = schedule.scheduleJob('*/10 * * * * *', function () {
		//win.webContents.send("execute-vera-values-export");
		win.webContents.send("execute-domoticz-values-export");

		//Tests
		// if (jsonSynology === null) {
		// 	var options = {
		// 		"method": "GET",
		// 		"hostname": "192.168.1.14",
		// 		"port": "5000",
		// 		"path": "xxxxx",
		// 		"headers": {
		// 			"content-type": "application/x-www-form-urlencoded",
		// 			"cache-control": "no-cache"
		// 		}
		// 	};

		// 	var req = http.request(options, function (res) {
		// 		var chunks = [];

		// 		res.on("data", function (chunk) {
		// 			chunks.push(chunk);
		// 		});

		// 		res.on("end", function () {
		// 			var body = Buffer.concat(chunks);
		// 			console.log(body.toString());
		// 			jsonSynology = JSON.parse(body);
		// 			console.log(jsonSynology.data.sid);

		// 		});
		// 	});

		// 	req.end();
		// }

		// if (jsonSynology !== null) {
		// 	var options1 = {
		// 		"method": "POST",
		// 		"hostname": "192.168.1.14",
		// 		"port": "5000",
		// 		"path": "/webapi/entry.cgi",
		// 		"headers": {
		// 			"content-type": "application/x-www-form-urlencoded",
		// 			"id": jsonSynology.data.sid
		// 		}
		// 	};

		// 	var req1 = http.request(options1, function (res) {
		// 		var chunks = [];

		// 		res.on("data", function (chunk) {
		// 			chunks.push(chunk);
		// 		});

		// 		res.on("end", function () {
		// 			var body = Buffer.concat(chunks);
		// 			console.log(body.toString());
		// 		});
		// 	});

		// 	req1.write(qs.stringify({
		// 		stop_when_error: 'false',
		// 		mode: '"sequential"',
		// 		compound: '[{"api":"SYNO.Core.Network.DHCPServer.ClientList","method":"list","version":2,"ifname":"eth0"}]',
		// 		api: 'SYNO.Entry.Request',
		// 		method: 'request',
		// 		version: '1'
		// 	}));
		// 	req1.end();
		// }
	});
});

ipcMain.on("download-datamine-database", (event, settings) => {
	console.log("download-datamine-database", settings);

	rimraf(settings.exportPathOnPi + '/database', function () {
		console.log("Deleted export/database directory before SCP starts");
	});

	scp.get({
		file: settings.dataMineDirectoryPath, // remote file to grab
		user: settings.username, // username to authenticate as on remote system
		password: settings.password, // username to authenticate as on remote system
		host: settings.veraIpAddress, // remote host to transfer from, set up in your ~/.ssh/config
		port: '22', // remote port, optional, defaults to '22'
		path: settings.exportPathOnPi // local path to save to (this would result in a ~/file.txt on the local machine)
	}, function (err, stdout, stderr) {
		console.log("SCP finished", err, stdout, stderr);

		var today = new Date();
		var dateString = today.toISOString().substring(0, 10);
		var filename = settings.exportPathOnPi + '/' + dateString + '.zip';
		console.log("Zipping export/database contents to", filename);
		zipdir(
			settings.exportPathOnPi + '/database',
			{ saveTo: filename },
			function (err, buffer) {
				console.log("zip callback", err);

				let formData = new FormData();
				formData.append('files', fs.createReadStream(filename));

				formData.submit("https://housedb.timdows.com/veraexport/upload", function (err, res) {
					console.log("submit", err, res.contents, res.statusCode);
					res.resume();
				});
			}
		);
	});
});

ipcMain.on("get-raspicam-stats", (event, settings) => {
	// console.log("get-raspicam-stats");

	https.get({
		host: settings.host,
		port: settings.port,
		path: settings.path,
		auth: settings.auth,
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

ipcMain.on("get-vera3-stats", (event, settings) => {
	console.log("get-vera3-stats");

	var ssh = new SSH({
		host: settings.veraIpAddress,
		user: settings.username,
		pass: settings.password
	});

	ssh.exec('df -h', {
		out: function (stdout) {
			console.log(stdout);
			win.webContents.send("set-vera3-stats", stdout);
		}
	}).start();
});

const getHttpResponseAndSendViaIpc = async function(url, ipcName){
  const res = await superagent.get(url);
//   console.log(res.text)
	let json = JSON.parse(res.text);
	win.webContents.send(ipcName, json);
}

// Used to handle CORS
ipcMain.on("get-http-response", (event, host, port, path, ipcName) => {
	// console.log("get-http-response", host, path, ipcName);
	getHttpResponseAndSendViaIpc('http://' + host + ":" + port + "/" + path, ipcName);
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