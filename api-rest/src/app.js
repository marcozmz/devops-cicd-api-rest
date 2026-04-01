const express = require('express');
const cors = require('cors');
const usuariosRouter = require('./routes/usuarios');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'API REST funcionando!', versao: '1.0.0' });
});

// Rotas
app.use('/api/usuarios', usuariosRouter);

// Middleware de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

module.exports = app;
