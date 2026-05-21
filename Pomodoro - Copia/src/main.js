// 1. Adicione o 'ipcMain' aqui na importação
const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 378,
        height: 410,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
        transparent: true
    });

    mainWindow.loadFile('src/templates/index.html');

    ipcMain.on('minimize-app', () => {
        mainWindow.minimize();
    });

    ipcMain.on('close-app', () => {
        app.quit();
    });
});