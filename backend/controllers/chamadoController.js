const db = require('../database/db');

exports.listar = async (req, res) => {
    const { status, prioridade } = req.query;
    let sql = 'SELECT c.*, u.nome AS responsavel FROM chamados c JOIN usuarios u ON c.usuario_id = u.id';
    const params = [];

    const conditions = [];
    if (status) {
        conditions.push('c.status = ?');
        params.push(status);
    }
    if (prioridade) {
        conditions.push('c.prioridade = ?');
        params.push(prioridade);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    try {
        const [chamados] = await db.query(sql, params);
        return res.status(200).json(chamados);
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro de banco de dados', erro: err.message });
    }
};

exports.buscarPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM chamados WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Chamado não encontrado' });
        }
        return res.status(200).json(rows[0]);
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro de banco de dados', erro: err.message });
    }
};

exports.cadastrar = async (req, res) => {
    const { titulo, descricao, categoria, prioridade, usuario_id } = req.body;

    if (!titulo || !descricao || !categoria || !prioridade || !usuario_id) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO chamados (titulo, descricao, categoria, prioridade, usuario_id) VALUES (?, ?, ?, ?, ?)',
            [titulo, descricao, categoria, prioridade, usuario_id]
        );
        return res.status(201).json({ mensagem: 'Chamado cadastrado com sucesso', id: result.insertId });
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro de banco de dados', erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;
    const { prioridade, status } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE chamados SET prioridade = COALESCE(?, prioridade), status = COALESCE(?, status) WHERE id = ?',
            [prioridade, status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Chamado não encontrado' });
        }
        return res.status(200).json({ mensagem: 'Chamado atualizado com sucesso' });
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro de banco de dados', erro: err.message });
    }
};

exports.excluir = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM chamados WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Chamado não encontrado' });
        }
        return res.status(200).json({ mensagem: 'Chamado excluído com sucesso' });
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro de banco de dados', erro: err.message });
    }
};