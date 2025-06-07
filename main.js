const { app, BrowserWindow } = require('electron')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 412,
    height: 244,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false, 
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'assets/icons/helldivers.ico') 
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  console.log('[Preload] Preload script loaded.');
  preload: path.join(__dirname, 'preload.js')
  createWindow()
})