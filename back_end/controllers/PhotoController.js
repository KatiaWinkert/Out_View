const Photo = require('../models/Photo')
const User = require('../models/User')

const mongoose = require('mongoose')

//inserir foto, com usuario relacionado a ela. - insert a photo, whit an user related to it

const insertPhoto = async (req, res) => {
  const { title } = req.body
  const image = req.file.filename

  console.log(req.body)

  const reqUser = req.user

  const user = await User.findById(reqUser._id)

  //create a phot

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  })

  //ver se foto foi criada com sucesso- if photo was created sucessfully, return date:
  if (!newPhoto) {
    res.status(422).json({
      errors: ['Houve uma erro, por favor tente mais tarde!'],
    })
    return
  }
  res.status(201).json(newPhoto)
}

// Removwndo a foto do db = remove a phot from db
const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params

    const reqUser = req.user

    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ['Foto não encontrada! '] })
      return
    }

    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ['Ocorreu um erro, por favor tente novamente mais tarde.'],
      })
    }

    await Photo.findByIdAndDelete(photo._id)

    res
      .status(200)
      .json({ id: photo._id, message: 'Foto excluída com sucesso.' })
  } catch (error) {
    res.status(404).json({ errors: ['Foto não encontrada! '] })
    return
  }
}

//Get all photos - Resgatado fotos:
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([['createdAt', -1]])
    .exec()

  return res.status(200).json(photos)
}

//Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params

  const photos = await Photo.find({ userId: id })
    .sort([['createdAt', -1]])
    .exec()

  return res.status(200).json(photos)
}

//Get photo by id - resgatando foto pelo id:
const getPhotoById = async (req, res) => {
  const { id } = req.params

  const photo = await Photo.findById(mongoose.Types.ObjectId(id))

  //check if photo exists : checando se a foto existe:

  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada!'] })
    return
  }

  res.status(200).json(photo)
}

//Update a photo - alterar a  foto
const updatePhoto = async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  let image

  if (req.file) {
    image = req.file.filename
  }

  const reqUser = req.user

  const photo = await Photo.findById(id)

  //check if photo exists = checando se foto existe
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada'] })
    return
  }

  //check if photo belongs to user - checar se a foto pertence ao usuario:
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({
      errors: ['Ocorreu um erro, por favor tente novamente mais tarde!'],
    })
    return
  }
  if (title) {
    photo.title = title
  }

  if (image) {
    photo.image = image
  }

  await photo.save()

  res.status(200).json({ photo, message: 'Foto atualizada com sucesso!' })
}

//like functionality - funcionalidade like da photo

const likePhoto = async (req, res) => {
  const { id } = req.params

  const reqUser = req.user

  const photo = await Photo.findById(id)

  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada'] })
    return
  }

  //check if user already liked the photo:
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ['Você já curtiu está foto.'] })
    return
  }

  //put user id in likes array: colocar id do usuario com likes array:
  photo.likes.push(reqUser._id)

  await photo.save()

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: 'A foto foi curtida' })
}

//Comment funcionality: funcionalidade comentario:
const commentPhoto = async (req, res) => {
  const { id } = req.params
  const { comment } = req.body

  const reqUser = req.user

  const user = await User.findById(reqUser._id)

  const photo = await Photo.findById(id)

  //check if photo exists = checando se foto existe
  if (!photo) {
    res.status(404).json({ errors: ['Foto não encontrada'] })
    return
  }

  //Put Comment in the array comment: comentario de arrays na foto:
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  }

  photo.comments.push(userComment)

  await photo.save()

  res.status(200).json({
    comment: userComment,
    message: 'O comentario foi adicionado com sucesso!',
  })
}

//Search photo by title : busca de foto pelo titulo:
const searchPhoto = async (req, res) => {
  const { q } = req.query

  const photos = await Photo.find({ title: new RegExp(q, 'i') }).exec()

  res.status(200).json(photos)
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhoto,
}
