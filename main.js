const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 850,
    height: 600,
    frame: false,
    resizable: false,
    backgroundColor: '#FFF',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  ipcMain.on("button-clicked", (event, data) => console.log(data));

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

  ipcMain.handle('getThePath', async (event, arg) => {
    const path = electron.app.getAppPath();
    return path;
  });
  win.loadFile('index.html')
  //win.webContents.openDevTools() //Toggle dev tools
}
app.whenReady().then(createWindow)