const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    resizable: true,
    backgroundColor: '#FFF',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  ipcMain.on("button-clicked", (event, data) => console.log(data))
  ipcMain.handle('minimize', async (event, arg) => {
    return new Promise(function() {
      win.isMinimized() ? win.restore() : win.minimize()
    });  
  });
  ipcMain.handle('maximize', async (event, arg) => {
    return new Promise(function() {
      win.isMaximized() ? win.restore() : win.maximize();
    });  
  });
  win.loadFile('index.html')
  //win.webContents.openDevTools()
}
app.whenReady().then(createWindow)