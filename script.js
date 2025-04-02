// ... (seu código JavaScript existente) ...

// Reações
let contadorCurtir = parseInt(localStorage.getItem('contadorCurtir')) || 0;
let contadorAmei = parseInt(localStorage.getItem('contadorAmei')) || 0;
let contadorMeTocou = parseInt(localStorage.getItem('contadorMeTocou')) || 0;

// Exibir contadores iniciais
document.getElementById('contador-curtir').textContent = contadorCurtir;
document.getElementById('contador-amei').textContent = contadorAmei;
document.getElementById('contador-me-tocou').textContent = contadorMeTocou;

function curtir() {
    contadorCurtir++;
    document.getElementById('contador-curtir').textContent = contadorCurtir;
    localStorage.setItem('contadorCurtir', contadorCurtir);
}

function amei() {
    contadorAmei++;
    document.getElementById('contador-amei').textContent = contadorAmei;
    localStorage.setItem('contadorAmei', contadorAmei);
}

function meTocou() {
    contadorMeTocou++;
    document.getElementById('contador-me-tocou').textContent = contadorMeTocou;
    localStorage.setItem('contadorMeTocou', contadorMeTocou);
}

// ... (seu código JavaScript existente) ...

// Contador de Visualizações
let contadorVisualizacoes = parseInt(localStorage.getItem('visualizacoes')) || 0;

function atualizarContador() {
    contadorVisualizacoes++;
    localStorage.setItem('visualizacoes', contadorVisualizacoes);
    document.getElementById('contador-visualizacoes').textContent = contadorVisualizacoes;
}

// Exibir contador inicial
document.getElementById('contador-visualizacoes').textContent = contadorVisualizacoes;

// ... (seu código JavaScript existente) ...
