// Função para buscar versículo e reflexão do arquivo versiculos.json
function obterVersiculo() {
    fetch('versiculos.json')
        .then(response => response.json())
        .then(data => {
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const versiculo = data[dia % data.length].versiculo;
            const reflexao = data[dia % data.length].reflexao;

            localStorage.setItem('versiculoDoDia', versiculo);
            localStorage.setItem('reflexaoDoDia', reflexao);

            document.getElementById('versiculo').textContent = versiculo;
            document.getElementById('reflexao').textContent = reflexao;
        })
        .catch(error => {
            console.error('Erro ao carregar versículos:', error);
            document.getElementById('versiculo').textContent = 'Erro ao carregar versículo.';
            document.getElementById('reflexao').textContent = 'Erro ao carregar reflexão.';
        });
}

// Alternar entre tema claro e escuro
function alternarTema() {
    document.body.classList.toggle('escuro');
    document.body.classList.toggle('claro');
}

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

function loginAdmin() {
    const senha = document.getElementById('adminSenha').value;
    if (senha === senhaAdmin) {
        adminLogado = true;
        alert("Login bem-sucedido!");
        document.getElementById('adminSenha').style.display = 'none';
        document.querySelector('.comentarios button').style.display = 'none';
        exibirComentarios();
    } else {
        alert("Senha incorreta.");
    }
}

function exibirComentarios() {
    const listaComentarios = document.getElementById('lista-comentarios');
    let comentariosHTML = '<h3>Comentários:</h3>';
    comentarios.forEach((comentario, index) => {
        comentariosHTML += `
            <p id="comentario-${index}">
                <strong>${comentario.nome}:</strong> ${comentario.texto}
                ${adminLogado ? `<button onclick="excluirComentario(${index})">Excluir</button>` : ''}
            </p>
        `;
    });
    listaComentarios.innerHTML = comentariosHTML;
}

function excluirComentario(index) {
    comentarios.splice(index, 1);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    exibirComentarios();
}

function enviarComentario() {
    const nome = document.getElementById('nome').value;
    const texto = document.getElementById('comentario').value;

    if (nome && texto) {
        comentarios.push({ nome, texto });
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        document.getElementById('nome').value = '';
        document.getElementById('comentario').value = '';
        exibirComentarios();
    } else {
        alert('Por favor, preencha o nome e o comentário.');
    }
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
