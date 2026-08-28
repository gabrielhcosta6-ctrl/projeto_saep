const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');

router.get('/chamados', chamadoController.listar);
router.get('/chamados/:id', chamadoController.buscarPorId);
router.post('/chamados', chamadoController.cadastrar);
router.put('/chamados/:id', chamadoController.atualizar);
router.delete('/chamados/:id', chamadoController.excluir);

module.exports = router;