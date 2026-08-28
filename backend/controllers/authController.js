const db = require('../database/db');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios' });
    }

    try {
        const [rows] = await db.query('SELECT id, nome, email, perfil FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);

        if (rows.length === 0) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        return res.status(200).json({ mensagem: 'Login realizado com sucesso', usuario: rows[0] });
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro no banco de dados', erro: err.message });
    }
};