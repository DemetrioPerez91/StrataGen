const { app, BrowserWindow } = require('electron')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 425,
    height: 208,
    icon: path.join(__dirname, 'assets/icons/helldivers.ico') 
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})