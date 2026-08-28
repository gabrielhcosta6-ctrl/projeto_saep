const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const chamadoRoutes = require('./routes/chamadoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(usuarioRoutes);
app.use(chamadoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});