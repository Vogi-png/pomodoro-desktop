const { ipcRenderer } = require('electron');

document.getElementById('btn_minimize').addEventListener('click', () => {
    ipcRenderer.send('window-minimize');
});

document.getElementById('btn_exit').addEventListener('click', () => {
    ipcRenderer.send('window-close');
});