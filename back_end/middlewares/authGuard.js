const User = require('../models/User')

const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  //Bearer yy32156y12156y46545d546
  //checando se o headers tem um token - check if header has a token:

  if (!token) return res.status(401).json({ errors: ['Acesso negado!'] })

  //checando se o token é valido - check toke is valid
  try {
    const verified = jwt.verify(token, jwtSecret)

    req.user = await User.findById(verified.id).select('-password')
    
    next()
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "token inválido."}] })
  }
}

module.exports = authGuard
