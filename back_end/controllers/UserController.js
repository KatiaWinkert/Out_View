const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

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

  if (!user) {
    res.status(422).json({ errors: ['Por favor, utilize outro e-mail'] })
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

// Get current logged in user - Resgatando usuario autenticado
const getCurrentUser = async (req, res) => {
  const user = req.user

  res.status(200).json(user)
}

//Sing user in - concluindo o login
const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // para checar se usuario existe - check if user exists
  if (!user) {
    res.status(404).json({ errors: ['Usuario Não encontrado!'] })
    return
  }

  //Chacando se a senha são iguais = check if password matches

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ['Senha invalida.'] })
    return
  }

  //Retornando o usuario com o Token - Return user with token (vou retornar tambem a imagem de perfil do usuario) nesse
  //codiogo eu posso retornar outros dados tb
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  })
}

//update en user
const update = async (req, res) => {
  const { name, password, bio } = req.body

  let profileImage = null

  if (req.file) {
    profileImage = req.file.filename
  }
  const reqUser = req.user

  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    '-password'
  )

  if (name) {
    user.name = name
  }

  if (password) {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    user.password = passwordHash
  }

  if (profileImage) {
    user.profileImage = profileImage
  }

  if (bio) {
    user.bio = bio
  }

  await user.save()

  res.status(200).json(user)
}

//Resgatando usuario pelo id - Get user by Id
const getUserByID = async (req, res) => {
  const { id } = req.params

  const user = await User.findById(mongoose.Types.ObjectId(id)).select(
    '-password'
  )
  //checando se o usuario existe - check if user exists
  if (user) {
    res.status(404).json({ errors: ['Usuario não encontrado!'] })
    return
  }

  res.status(200).json(user)
}

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserByID,
}
