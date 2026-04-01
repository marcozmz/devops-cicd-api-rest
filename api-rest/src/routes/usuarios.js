const express = require('express');
const router = express.Router();
const {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require('../controllers/usuariosController');
const { validarUsuario } = require('../middlewares/validacao');

router.get('/', listarUsuarios);
router.get('/:id', buscarUsuario);
router.post('/', validarUsuario, criarUsuario);
router.put('/:id', validarUsuario, atualizarUsuario);
router.delete('/:id', deletarUsuario);

module.exports = router;
