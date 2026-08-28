const db = require('../database/db');

exports.cadastrar = async (req, res) => {
    const { nome, email, senha, perfil } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos obrigatórios' });
    }

    try {
        const [result] = await db.query('INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)', [nome, email, senha, perfil || 'usuario']);
        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', id: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
        }
        return res.status(500).json({ mensagem: 'Erro de banco de dados', erro: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const [usuarios] = await db.query('SELECT id, nome, email, perfil FROM usuarios');
        return res.status(200).json(usuarios);
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro de banco de dados', erro: err.message });
    }
};