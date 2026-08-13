// --- SISTEMA DE ALTERAÇÃO DE FONTE ---
let currentFontSize = 18; // Base definida no CSS

function alterarFonte(delta) {
    currentFontSize += delta * 2;
    // Limites de segurança
    if (currentFontSize < 14) currentFontSize = 14;
    if (currentFontSize > 36) currentFontSize = 36;
    document.body.style.fontSize = currentFontSize + 'px';
    
    // Alerta leitor de tela do usuário da mudança
    window.speechSynthesis.cancel();
    falar(`Fonte ajustada para ${currentFontSize} pixels`);
}

// --- SISTEMA DE NARRAÇÃO (Text-to-Speech) com Controles ---
let synth = window.speechSynthesis;
let utterance = null;
let currentTextToRead = "";
let isPaused = false;

// Referências DOM
const playerControls = document.getElementById('audio-player-controls');
const playPauseBtn = document.getElementById('play-pause-btn');

function falar(texto) {
    synth.cancel(); // Para qualquer fala anterior
    utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    synth.speak(utterance);
}

function iniciarNarracaoConteudo(idElemento) {
    const container = document.getElementById(idElemento);
    // Pega apenas o texto, ignorando botões dentro dele
    currentTextToRead = container.innerText; 
    
    if (currentTextToRead) {
        // Mostra o player de áudio na barra superior
        playerControls.classList.remove('hidden');
        falar(currentTextToRead);
        playPauseBtn.innerText = "⏸️"; // Reset para pause icon
        isPaused = false;
    }
}

function togglePlayPause() {
    if (!utterance) return;

    if (synth.speaking && !synth.paused) {
        synth.pause();
        playPauseBtn.innerText = "▶️"; // Ícone Play
        isPaused = true;
    } else if (synth.paused) {
        synth.resume();
        playPauseBtn.innerText = "⏸️"; // Ícone Pause
        isPaused = false;
    }
}

// --- FUNÇÕES COMPLEXAS DE TEMPO (Aproximação) ---
// Como a Web Speech API não dá tempo preciso, estas funções são limitadas 
// numa implementação simples. Para um site real, geralmente recomenda-se:
// 1. Usar áudios pré-gravados (MP3 real) se precisar de barra de progresso do YouTube.
// 2. Depender do leitor de tela nativo do usuário (NVDA/JAWS) que já tem essas teclas de atalho.

function voltar10s() {
    console.log("A função voltar 10s em TTS nativo requer fragmentação de texto avançada.");
    falar("Não é possível voltar o tempo na narração automática. Use seu leitor de tela native.");
}

function adiantar10s() {
    console.log("A função adiantar 10s em TTS nativo requer fragmentação de texto avançada.");
    falar("Não é possível adiantar o tempo na narração automática.");
}