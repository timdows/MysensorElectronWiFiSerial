const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const url = require('url');
const fs = require('fs');

require('electron-reload')(__dirname);
require('dotenv').config();

let win = null;

app.on('ready', function () {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow(
    {
      width: 800, 
      height: 480,
      fullscreen: true,
      frame: false
    });

  // Specify entry point
  if (process.env.PACKAGE === 'true'){
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
    //win.webContents.openDevTools();
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

	// Remove window once app is closed
	win.on('closed', function () {
		win = null;
	});

});

ipcMain.on("get-raspicam-stats", (event, arg) => {
	console.log("get-raspicam-stats", arg);
	var files = [];
	fs.readdir(".", (err, files) => {
		files.forEach(file => {
			files.push(file);
		});
		console.log("files", files);
		//event.sender.send("set-raspicam-stats", files);
		win.webContents.send("set-raspicam-stats", files);
	})
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
