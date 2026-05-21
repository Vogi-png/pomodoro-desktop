const { ipcRenderer } = require('electron');
const btnMusic = document.getElementById('btnMusic');

document.getElementById('btn_minimize').addEventListener('click', () => {
    ipcRenderer.send('window-minimize');
});

document.getElementById('btn_exit').addEventListener('click', () => {
    ipcRenderer.send('window-close');
});

// Quando clicar, envia o sinal para o main.js abrir a janela
if (btnMusic) {
    btnMusic.addEventListener('click', () => {
        ipcRenderer.send('open-music-window');
    });
}