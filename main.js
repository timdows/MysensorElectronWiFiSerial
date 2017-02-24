const {app, BrowserWindow} = require('electron')
const path = require('path');
const url = require('url');
const pug = require('electron-pug')({pretty:true});

require('electron-reload')(__dirname);
require('dotenv').config();

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow(
    {
      width: 800, 
      height: 480,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      //frame: false
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
    //win.webContents.openDevTools();
  }

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});