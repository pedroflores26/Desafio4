
let total = parseFloat(localStorage.getItem('total')) || 0;
let quantidades = JSON.parse(localStorage.getItem('quantidades')) || { 0.10: 0, 0.25: 0, 0.50: 0, 1.00: 0 };
atualizarTotal();
atualizarQuantidades();
atualizarCofre();

function adicionar(valor) {
    total += valor;
    quantidades[valor]++;
    salvarEstado();
    atualizarTotal();
    atualizarQuantidades();
    atualizarCofre();
}

function adicionarQuantia(valor) {
    if (valor > 0) {
        total += valor;
        salvarEstado();
        atualizarTotal();
        atualizarCofre();
    }
}

function sacar() {
    const valor = parseFloat(document.getElementById('saque').value);
    if (isNaN(valor) || valor <= 0) return;
    if (valor > total) {
        exibirMensagem('Você não tem saldo para o saque!');
        return;
    }
    total -= valor;
    salvarEstado();
    atualizarTotal();
    atualizarQuantidades();
    atualizarCofre();
    exibirMensagem('');
}

function esvaziar() {
    total = 0;
    quantidades = { 0.10: 0, 0.25: 0, 0.50: 0, 1.00: 0 };
    salvarEstado();
    atualizarTotal();
    atualizarQuantidades();
    atualizarCofre();
}

function atualizarTotal() {
    const formatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
    document.getElementById('total').textContent = 'Total: ' + formatado;
}

function atualizarQuantidades() {
    const quantDiv = document.getElementById('quantidades');
    quantDiv.innerHTML = `Moedas: R$0,10 (${quantidades[0.10]}), R$0,25 (${quantidades[0.25]}), R$0,50 (${quantidades[0.50]}), R$1,00 (${quantidades[1.00]})`;
}

function atualizarCofre() {
    const porco = document.getElementById('porco');
    const escala = Math.min(2, 1 + (total / 100)); // Tamanho máximo 2x
    porco.style.transform = `scale(${escala})`;
}

function exibirMensagem(msg) {
    document.getElementById('mensagem').textContent = msg;
}

function salvarEstado() {
    localStorage.setItem('total', total);
    localStorage.setItem('quantidades', JSON.stringify(quantidades));
}

function depositar() {
    const valor = parseFloat(document.getElementById('deposito').value);
    if (isNaN(valor) || valor <= 0) return;
    total += valor;
    salvarEstado();
    atualizarTotal();
    atualizarQuantidades();
    atualizarCofre();
    exibirMensagem('Depósito realizado com sucesso!');
}
