// --- SISTEMA DE MODO ESCURO ---
function toggleDarkMode() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeBtn.innerText = "☀️ Modo Claro";
        themeBtn.setAttribute('aria-label', 'Alternar para modo claro');
        falar("Modo escuro ativado");
    } else {
        themeBtn.innerText = "🌙 Modo Escuro";
        themeBtn.setAttribute('aria-label', 'Alternar para modo escuro');
        falar("Modo claro ativado");
    }
}

// --- SISTEMA DE ALTERAÇÃO DE FONTE ---
let currentFontSize = 18;

function alterarFonte(delta) {
    currentFontSize += delta * 2;
    if (currentFontSize < 14) currentFontSize = 14;
    if (currentFontSize > 36) currentFontSize = 36;
    document.body.style.fontSize = currentFontSize + 'px';
    
    window.speechSynthesis.cancel();
    falar(`Fonte ajustada para ${currentFontSize} pixels`);
}

// --- SISTEMA DE NARRAÇÃO ---
let synth = window.speechSynthesis;
let utterance = null;

const playerControls = document.getElementById('audio-player-controls');
const playPauseBtn = document.getElementById('play-pause-btn');

function falar(texto) {
    synth.cancel();
    utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    synth.speak(utterance);
}

function iniciarNarracaoConteudo(idElemento) {
    const container = document.getElementById(idElemento);
    const texto = container.innerText; 
    
    if (texto) {
        playerControls.classList.remove('hidden');
        falar(texto);
        playPauseBtn.innerText = "⏸️";
    }
}

function togglePlayPause() {
    if (!utterance) return;

    if (synth.speaking && !synth.paused) {
        synth.pause();
        playPauseBtn.innerText = "▶️";
    } else if (synth.paused) {
        synth.resume();
        playPauseBtn.innerText = "⏸️";
    }
}

function voltar10s() {
    falar("Função voltar não disponível na síntese de voz simples.");
}

function adiantar10s() {
    falar("Função adiantar não disponível na síntese de voz simples.");
}