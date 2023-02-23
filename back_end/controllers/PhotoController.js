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
      errors: ['Houve uma falha, por favor tente mais tarde!'],
    })
    return
  }
  res.status(201).json(newPhoto)
}

// Removwndo a foto do db = remove a phot from db
const deletePhoto = async (req, res) => {
  const { id } = req.params

  const reqUser = req.user
  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    //check if photo exist
    if (!photo) {
      res.status(404).json({ errors: ['Foto não encontrada'] })
      return
    }

    //check photo belongs to user - checar se a foto pertence ao usuario
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ['Ocorreu um erro, por favor tente novamente mais tarde!'],
      })
      return
    }

    await Photo.findByIdAndDelete(photo._id)

    res
      .status(200)
      .json({ id: photo._id, message: 'Foto excluida com sucesso!' })
  } catch (error) {
    res.status(404).json({ errors: 'Foto excluida com sucesso!' })
    return
  }
}

module.exports = {
  insertPhoto,
  deletePhoto,
}
