//Nesse aquivo teremos validações para registros, login ...
const { body } = require('express-validator')

const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('O nome é obrigatório!')
      .isLength({ min: 3 })
      .withMessage('O texto precisa ter no mínino 3 caracteres.'),
    body('email')
      .isString()
      .withMessage('O e-mail é obrigatório!')
      .isEmail()
      .withMessage('Insira um email valido.'),
    body('password')
      .isString()
      .withMessage('A senha é obrigatoria!')
      .isLength({ min: 5 })
      .withMessage('A senha precisa ter no mínino 5 caracteres.'),
    body('confirmpassword')
      .isString()
      .withMessage('A confirmação da senha é obrigatória.')
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error('As senhas precisam ser iguais!')
        }
        return true
      }),
  ]
}

module.exports = {
  userCreateValidation,
}