const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();
    carregarChamados();

    document.getElementById('formChamado').addEventListener('submit', cadastrarChamado);
});

async function carregarUsuarios() {
    const res = await fetch(`${API_URL}/usuarios`);
    const usuarios = await res.json();
    const select = document.getElementById('usuario_id');
    select.innerHTML = '';
    usuarios.forEach(u => {
        select.innerHTML += `<option value="${u.id}">${u.nome}</option>`;
    });
}

async function carregarChamados() {
    const status = document.getElementById('filtroStatus').value;
    const prioridade = document.getElementById('filtroPrioridade').value;

    let url = `${API_URL}/chamados?`;
    if (status) url += `status=${status}&`;
    if (prioridade) url += `prioridade=${prioridade}&`;

    const res = await fetch(url);
    const chamados = await res.json();
    
    atualizarDashboard(chamados);

    const tbody = document.getElementById('tabelaChamados');
    tbody.innerHTML = '';

    chamados.forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.titulo}</td>
                <td>${c.categoria}</td>
                <td>
                    <select onchange="atualizarChamado(${c.id}, this.value, '${c.status}')">
                        <option value="baixa" ${c.prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
                        <option value="média" ${c.prioridade === 'média' ? 'selected' : ''}>Média</option>
                        <option value="alta" ${c.prioridade === 'alta' ? 'selected' : ''}>Alta</option>
                    </select>
                </td>
                <td>
                    <select onchange="atualizarChamado(${c.id}, '${c.prioridade}', this.value)">
                        <option value="aberto" ${c.status === 'aberto' ? 'selected' : ''}>Aberto</option>
                        <option value="em andamento" ${c.status === 'em andamento' ? 'selected' : ''}>Em Andamento</option>
                        <option value="concluído" ${c.status === 'concluído' ? 'selected' : ''}>Concluído</option>
                    </select>
                </td>
                <td>${c.responsavel}</td>
                <td>${new Date(c.data_criacao).toLocaleString()}</td>
                <td>
                    <button class="danger" onclick="excluirChamado(${c.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

function atualizarDashboard(chamados) {
    document.getElementById('cntTotal').innerText = chamados.length;
    document.getElementById('cntAberto').innerText = chamados.filter(c => c.status === 'aberto').length;
    document.getElementById('cntAndamento').innerText = chamados.filter(c => c.status === 'em andamento').length;
    document.getElementById('cntConcluido').innerText = chamados.filter(c => c.status === 'concluído').length;
}

async function cadastrarChamado(e) {
    e.preventDefault();
    const body = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        prioridade: document.getElementById('prioridade').value,
        usuario_id: document.getElementById('usuario_id').value
    };

    const res = await fetch(`${API_URL}/chamados`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        document.getElementById('formChamado').reset();
        carregarChamados();
    } else {
        alert('Erro ao cadastrar chamado!');
    }
}

async function atualizarChamado(id, prioridade, status) {
    await fetch(`${API_URL}/chamados/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prioridade, status })
    });
    carregarChamados();
}

async function excluirChamado(id) {
    if (confirm('Deseja realmente excluir este chamado?')) {
        await fetch(`${API_URL}/chamados/${id}`, { method: 'DELETE' });
        carregarChamados();
    }
}