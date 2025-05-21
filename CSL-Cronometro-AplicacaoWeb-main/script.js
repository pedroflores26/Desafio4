// Variáveis do Timer
let timerInterval; // Armazena o intervalo do timer
let totalTime = 25 * 60; // Tempo padrão (25 minutos em segundos)


// Elementos do DOM
const minutesDisplay = document.getElementById('minutes'); // Elemento que exibe os minutos
const secondsDisplay = document.getElementById('seconds'); // Elemento que exibe os segundos
const startButton = document.getElementById('start');       // Botão de iniciar
const pauseButton = document.getElementById('pause');       // Botão de pausar
const stopButton = document.getElementById('stop');         // Botão de parar
const resetButton = document.getElementById('reset');       // Botão de reiniciar
const plusButton = document.getElementById('plus');         // Botão de aumentar tempo
const minusButton = document.getElementById('minus');       // Botão de diminuir tempo
const timeInput = document.getElementById('time');          // Campo de entrada de tempo personalizado
const defineButton = document.getElementById('define');     // Botão para definir tempo personalizado


// Atualiza o display do timer
function updateDisplay() {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}


// Inicia o timer
startButton.addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (totalTime > 0) {
                totalTime--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Tempo esgotado!');
            }
        }, 1000);
    }
});


// Pausa o timer
pauseButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});



// Para o timer e zera o tempo
stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalTime = 0;
    updateDisplay();
});


// Reinicia o timer para 25 minutos
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalTime = 25 * 60;
    updateDisplay();
});


// Aumenta o tempo em 1 minuto
plusButton.addEventListener('click', () => {
    totalTime += 60;
    updateDisplay();
});


// Diminui o tempo em 1 minuto
minusButton.addEventListener('click', () => {
    if (totalTime > 60) {
        totalTime -= 60;
        updateDisplay();
    }
});


// Define um tempo personalizado (em minutos)
defineButton.addEventListener('click', () => {
    const customTime = parseInt(timeInput.value, 10);
    if (!isNaN(customTime) && customTime > 0) {
        totalTime = customTime * 60;
        updateDisplay();
    }
});


// Inicializa o display ao carregar a página
updateDisplay();


// Tempos predefinidos para Pomodoro, Pausa Curta e Longa
const pomodoroTimes = {
    pomodoro: 25 * 60, // 25 minutos
    short: 5 * 60,     // 5 minutos
    long: 15 * 60      // 15 minutos
};


// Alterna entre as abas (Pomodoro / Pausa Curta / Pausa Longa)
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove classe ativa de todas as abas
        tabs.forEach(t => t.classList.remove('active'));
        // Adiciona classe ativa à aba clicada
        tab.classList.add('active');

        // Define o tempo de acordo com a aba selecionada
        if (tab.id === 'tab-pomodoro') {
            totalTime = pomodoroTimes.pomodoro;
        } else if (tab.id === 'tab-short') {
            totalTime = pomodoroTimes.short;
        } else if (tab.id === 'tab-long') {
            totalTime = pomodoroTimes.long;
        }

        // Para o timer atual e atualiza o display
        clearInterval(timerInterval);
        timerInterval = null;
        updateDisplay();
    });
});
