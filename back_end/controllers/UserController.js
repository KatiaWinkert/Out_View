const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '7d',
  })
}

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body

  //checando se o usuario existe:
  const user = await User.findOne({ email })

  if (user) {
    res.status(422).json({ errors: ['Esse email já esta cadastrado!'] })
    return
  }

  // Generate password hash  gerando senha string aleatoria para que ninguem acesse os dados de forma indevida
  // o proprio sistema gera através desses codigos:
  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

  //Criar usuario = Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  })

  //chegando usuario foi criado com sucesso, retorna o token : if user was create sucessfully, return the token:
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ['Houve um erro, por favor tente mais tarde!'] })
    return
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  })
}

//Sing user in 
const login = (req, res) => {
  res.send('Login')
}

module.exports = {
  register,
  login,
}
