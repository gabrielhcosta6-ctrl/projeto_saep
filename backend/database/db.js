const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Altere se a sua senha do MySQL for diferente
    password: '1234',      // Coloque sua senha do MySQL aqui
    database: 'suporte_tecnico'
});

db.getConnection((err, conn) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
        conn.release();
    }
});

module.exports = db.promise();