//Pegar os objetos foco do HTML
const display = document.getElementById('display');
const btnTimer = document.getElementById('btnTimer');
const alarm = new Audio('../static/audio/alarm.mp3');
const hover = new Audio('../static/audio/hover.mp3');
const click = new Audio('../static/audio/click.wav');
const phrases = document.getElementById('phrases');
const btnArrowLeft = document.getElementById('btnArrowLeft');
const btnArrowRight = document.getElementById('btnArrowRight'); 

let inicialTime = 25 * 60; // Tempo inicial (25 minutos) em segundos 
let timeRemaining = inicialTime; // Tempo restante
let chronometer = null; // Variável para armazenar o intervalo do cronômetro
let studyMode = true; // Variável para controlar o modo (estudo ou descanso)

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60); // transformar o tempo restante em minutos
    const seconds = timeRemaining % 60; // transformar o tempo restante em segundos

    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Exibir o tempo no formato MM:SS
}

// função para resetar o timer
function resetTimer() {
    clearInterval(chronometer); // para o cronômetro
    chronometer = null;
    timeRemaining = inicialTime;
    updateDisplay();
    btnTimer.innerText = "INICIAR";
    if (studyMode) {
        phrases.innerText = "BORA ESTUDAR";
    } else {    
        phrases.innerText = "HORA DO DESCANSO";
    }
    console.log("Timer Reiniciado");
}

// função para pausar o timer
function stopTimer() {
    clearInterval(chronometer);
    chronometer = null;
    btnTimer.innerText = "▶︎";
}

function toggleMode() {
    studyMode = !studyMode; // Inverte o modo

    stopTimer(); // Para o timer atual 

    if (studyMode) {
        // --- MODO ESTUDO ---
        inicialTime = 25 * 60;
        document.querySelector('.background').style.background = "linear-gradient(178deg,rgba(255, 154, 131, 1) 0%, rgba(255, 211, 191, 1) 100%)"; // Cor pêssego
        document.querySelector('.container').style.backgroundColor = "#FFDDC5"; 
        document.querySelector('.btn_timer').style.backgroundColor = "#FFC8A0"; 
        phrases.innerText = "BORA ESTUDAR";
        btnTimer.innerText = "INICIAR";

    } else {
        // --- MODO DESCANSO ---
        inicialTime = 5 * 60;
        document.querySelector('.background').style.background = "linear-gradient(178deg,rgb(131, 170, 255) 0%, rgb(191, 222, 255) 100%)"; // Azulzinho
        document.querySelector('.container').style.backgroundColor = "#c5efff"; 
        document.querySelector('.btn_timer').style.backgroundColor = "#a0d9ff"; 
        phrases.innerText = "HORA DO DESCANSO";
        btnTimer.innerText = "INICIAR";

    }

    timeRemaining = inicialTime; // Reseta o tempo para o novo modo
    updateDisplay(); // Atualiza a tela
}

function positivity() {

    let phrasesList = [];
    // Frases motivacionais para o modo estudo
    if (studyMode) {
        phrasesList = [
            "VOCÊ CONSEGUE",
            "MANTENHA O FOCO",
            "QUASE LÁ",
            "CONTINUE ASSIM",
            "VOCÊ É INCRÍVEL",
            "SUNSET SHIMMER TORCE POR VOCÊ",
            "VOCê SERÁ LEGENDÁRIO",
            "NÃO DESISTA",
            "YUPPI!",
            "MUITO BEM!",
            "CONTINUE LUTANDO",
            "SATORO GOJO ESTARIA ORGULHOSO DE VOCÊ",
            "SIGA EM FRENTE"
        ];
    // Frases motivacionais para o modo descanso
    } else {
        phrasesList = [
            "DESCANSE UM POUCO",
            "VOCÊ MERECE",
            "APROVEITE O DESCANSO",
            "RELAXE E RECARREGUE",
            "VOCÊ TRABALHOU DURO",
            "HORA DE DESCONTRAIR",
            "*MAKI ZENIN AFAGA SUA CABEÇA*",
            "VOCÊ FEZ UM ÓTIMO TRABALHO",
            "RELAXE",
            "HORA DE SE DIVERTIR",
            "APROVEITE O DESCANSO"
        ];
    }
    
    const randomIndex = Math.floor(Math.random() * phrasesList.length);
    return phrasesList[randomIndex];
}

// lógica de clique para iniciar ou pausar o timer
btnTimer.addEventListener('click', () => {
    if (chronometer) {
        stopTimer();
    } else {
        btnTimer.innerText = "";
        phrases.innerText = positivity();
        chronometer = setInterval(() => {
            if (timeRemaining <= 0) {
                resetTimer();
                alarm.play();
                return;
            }
            timeRemaining--;
            updateDisplay();
        }, 1000);
    }
});

// lógica de clique duplo para resetar o timer
btnTimer.addEventListener('dblclick', () => {
    resetTimer();
});

btnArrowLeft.addEventListener('click', toggleMode);
btnArrowRight.addEventListener('click', toggleMode);


click.volume = 0.3;
const allButtons = document.querySelectorAll('button, .btn_arrowLeft, .btn_arrowRight');

allButtons.forEach(button => {
    // Efeito sonoro ao passar o mouse
    button.addEventListener('mouseenter', () => {
        hover.currentTime = 0;
        hover.play();
    });
    // Efeito sonoro ao clicar
    button.addEventListener('click', () => {
        click.currentTime = 0;
        click.play();
    });
});
 
// Inicialização
updateDisplay();