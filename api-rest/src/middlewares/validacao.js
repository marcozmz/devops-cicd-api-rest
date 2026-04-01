const { body, validationResult } = require('express-validator');

const validarUsuario = [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 2 }).withMessage('Nome deve ter ao menos 2 caracteres'),
  body('email')
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido'),
  body('idade')
    .notEmpty().withMessage('Idade é obrigatória')
    .isInt({ min: 0, max: 120 }).withMessage('Idade deve ser um número entre 0 e 120'),

  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    next();
  },
];

module.exports = { validarUsuario };
