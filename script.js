// Função para buscar versículo e reflexão do arquivo versiculos.json
function obterVersiculo() {
    fetch('versiculos.json')
        .then(response => response.json())
        .then(data => {
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const versiculo = data[dia % data.length].versiculo;
            const reflexao = data[dia % data.length].reflexao;

            // Armazena o versículo do dia anterior
            const diaAnterior = (dia - 1 + data.length) % data.length;
            const versiculoAnterior = data[diaAnterior].versiculo;
            localStorage.setItem('versiculoAnterior', versiculoAnterior);

            localStorage.setItem('versiculoDoDia', versiculo);
            localStorage.setItem('reflexaoDoDia', reflexao);

            document.getElementById('versiculo').textContent = versiculo;
            document.getElementById('reflexao').textContent = reflexao;
            exibirVersiculoAnterior(); // Exibe o versículo do dia anterior
        })
        .catch(error => {
            console.error('Erro ao carregar versículos:', error);
            document.getElementById('versiculo').textContent = 'Erro ao carregar versículo.';
            document.getElementById('reflexao').textContent = 'Erro ao carregar reflexão.';
        });
}

// Função para exibir o versículo do dia anterior
function exibirVersiculoAnterior() {
    const versiculoAnterior = localStorage.getItem('versiculoAnterior');
    if (versiculoAnterior) {
        document.getElementById('versiculoAnterior').textContent = `Versículo do Dia Anterior: ${versiculoAnterior}`;
    }
}

// Alternar entre tema claro e escuro
const btnAlternarTema = document.getElementById('alternar-tema-btn');

btnAlternarTema.addEventListener('click', () => {
    document.body.classList.toggle('escuro');
    document.body.classList.toggle('claro');
});

// Reações
let contadorCurtir = parseInt(localStorage.getItem('contadorCurtir')) || 0;
let contadorAmei = parseInt(localStorage.getItem('contadorAmei')) || 0;
let contadorMeTocou = parseInt(localStorage.getItem('contadorMeTocou')) || 0;

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

// Comentários
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
let adminLogado = false;
const senhaAdmin = "suaSenhaSecreta"; // Substitua pela sua senha
let contadorVisualizacoes = parseInt(localStorage.getItem('visualizacoes')) || 0;

// Login do Administrador (Modal)
const modal = document.getElementById('modal-login');
const btnLogin = document.getElementById('btn-login');
const spanFechar = document.getElementsByClassName('fechar')[0];

btnLogin.onclick = function() {
    modal.style.display = 'block';
}

spanFechar.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function loginAdmin() {
    const senha = document.getElementById('senha-admin').value;
    if (senha === senhaAdmin) {
        adminLogado = true;
        alert("Login bem-sucedido!");
        modal.style.display = 'none';
        btnLogin.style.display = 'none';
        exibirComentarios();
    } else {
        alert("Senha incorreta.");
    }
}

function gerarChaveComentarios() {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
    return `comentarios_${ano}${mes}${dia}`;
}

function carregarComentarios() {
    const chaveComentarios = gerarChaveComentarios();
    return JSON.parse(localStorage.getItem(chaveComentarios)) || [];
}

function salvarComentarios(comentarios) {
    const chaveComentarios = gerarChaveComentarios();
    localStorage.setItem(chaveComentarios, JSON.stringify(comentarios));
}

function enviarComentario() {
    const nome = document.getElementById('nome').value;
    const texto = document.getElementById('comentario').value;

    if (nome && texto) {
        let comentarios = carregarComentarios();
        comentarios.push({ nome, texto, autor: nome });
        salvarComentarios(comentarios);
        document.getElementById('nome').value = '';
        document.getElementById('comentario').value = '';
        exibirComentarios();
    } else {
        alert('Por favor, preencha o nome e o comentário.');
    }
}

function exibirComentarios() {
    const listaComentarios = document.getElementById('lista-comentarios');
    let comentarios = carregarComentarios();
    let comentariosHTML = '<h3>Comentários:</h3>';
    comentarios.forEach((comentario, index) => {
        comentariosHTML += `
            <p id="comentario-${index}">
                <strong>${comentario.nome}:</strong> ${comentario.texto}
                ${adminLogado || comentario.autor === document.getElementById('nome').value ? `<button onclick="excluirComentario(${index})">Excluir</button>` : ''}
            </p>
        `;
    });
    listaComentarios.innerHTML = comentariosHTML;
}

function excluirComentario(index) {
    let comentarios = carregarComentarios();
    comentarios.splice(index, 1);
    salvarComentarios(comentarios);
    exibirComentarios();
}

// Garantir que o versículo seja atualizado à meia-noite
function verificarHorario() {
    const diaAtual = new Date().getDate();
    const ultimoDiaAtualizado = localStorage.getItem('ultimoDiaAtualizado');

    if (ultimoDiaAtualizado !== String(diaAtual)) {
        localStorage.removeItem('versiculoDoDia');
        localStorage.removeItem('reflexaoDoDia');
        localStorage.setItem('ultimoDiaAtualizado', diaAtual);
        obterVersiculo();
    }
}

// Carregar e exibir versículo e reflexão
function carregarVersiculo() {
    const versiculo = localStorage.getItem('versiculoDoDia');
    const reflexao = localStorage.getItem('reflexaoDoDia');

    if (versiculo && reflexao) {
        document.getElementById('versiculo').textContent = versiculo;
        document.getElementById('reflexao').textContent = reflexao;
    } else {
        obterVersiculo();
    }
}

// Inicialização
carregarVersiculo();
verificarHorario();
exibirComentarios();
exibirVersiculoAnterior();

// Contador de Visualizações
function atualizarContador() {
    contadorVisualizacoes++;
    localStorage.setItem('visualizacoes', contadorVisualizacoes);
    document.getElementById('contador').textContent = contadorVisualizacoes;
}

atualizarContador();
