const { ipcRenderer } = require('electron');

// Lógica para Minimizar
document.getElementById('btn_minimize').addEventListener('click', () => {
    ipcRenderer.send('minimize-app');
});

// Lógica para Fechar 
document.getElementById('btn_exit').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});

// Tentando fazer a lógica das setas
btnSetas.addEventListener('click', () => {
    if (arrowLeft) {
        arrowLeft.hide();
        arrowright.show();
        //mudar timer para 5 min (modo descanso)
    } else {
        arrowright.hide();
        arrowLeft.show();
        //mudar timer para 25 min (modo estudo)
    }
});