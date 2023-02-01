//função de validação que será utilizada nas rotas

const { validationResult } = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)

  //se esta vazio, não tem erro continua a requisição
  if (errors.isEmpty()) {
    return next()
  }

  // agora de ele não esta vazio ele tem erro (erros extratidos da requisição)
  const extractedErros = []

  errors.array().map((err) => extractedErros.push(err.msg))
  return res.status(422).json({
    errors: extractedErros,
  })
}

module.exports = validate
