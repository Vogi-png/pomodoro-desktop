const { app, BrowserWindow, ipcMain } = require('electron');

// Variáveis globais para podermos compará-las depois
let mainWindow = null;
let musicWindow = null;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 378,
        height: 410,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false
        },
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
        transparent: true
    });

    mainWindow.loadFile('src/templates/index.html');
};

const createmusicWindow = () => {
    musicWindow = new BrowserWindow({
        width: 328,
        height: 329,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false
        },
        autoHideMenuBar: true,
        frame: false,
        resizable: false,
        transparent: true
    });

    musicWindow.loadFile('src/templates/music.html');
};

app.whenReady().then(() => {
    createMainWindow();
    createmusicWindow();
});

// ==========================================
// Eventos IPC (Registrados apenas UMA vez)
// ==========================================

ipcMain.on('window-minimize', (event) => {
    // Descobre qual janela enviou o sinal
    const win = BrowserWindow.fromWebContents(event.sender);

    if (win) {
        win.minimize();
    }
});

ipcMain.on('window-close', (event) => {
    // Descobre qual janela apertou o botão de fechar
    const win = BrowserWindow.fromWebContents(event.sender);
    
    // Se quem pediu pra fechar foi a mainWindow, encerra o app
    if (win === mainWindow) {
        app.quit();
    } 
    // Se foi qualquer outra janela (como a de música), fecha só ela
    else if (win) {
        win.close();
    }
});