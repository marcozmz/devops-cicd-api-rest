const { v4: uuidv4 } = require('uuid');
const { usuarios } = require('../data/db');

// GET /api/usuarios
const listarUsuarios = (req, res) => {
  res.json({ total: usuarios.length, dados: usuarios });
};

// GET /api/usuarios/:id
const buscarUsuario = (req, res) => {
  const usuario = usuarios.find((u) => u.id === req.params.id);
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  res.json(usuario);
};

// POST /api/usuarios
const criarUsuario = (req, res) => {
  const { nome, email, idade } = req.body;
  const novoUsuario = { id: uuidv4(), nome, email, idade };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
};

// PUT /api/usuarios/:id
const atualizarUsuario = (req, res) => {
  const index = usuarios.findIndex((u) => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  const { nome, email, idade } = req.body;
  usuarios[index] = { ...usuarios[index], nome, email, idade };
  res.json(usuarios[index]);
};

// DELETE /api/usuarios/:id
const deletarUsuario = (req, res) => {
  const index = usuarios.findIndex((u) => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  usuarios.splice(index, 1);
  res.status(204).send();
};

module.exports = { listarUsuarios, buscarUsuario, criarUsuario, atualizarUsuario, deletarUsuario };
