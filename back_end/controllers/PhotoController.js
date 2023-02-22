const Photo = require('../models/Photo')

const mongoose = require('mongoose')

//inserir foto, com usuario relacionado a ela. - insert a photo, whit an user related to it

const insertPhoto = async (req, res) => {
  const { title } = req.body
  const image = req.file.filename

  const reqUser = req.reqUser

  const user = await User.findById(reqUser._id)

  //create a phot

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  })

  //ver se foto foi criada com sucesso- if photo was created sucessfully, return date: 

  




  res.send('Photo insert')
}

module.exports = {
  insertPhoto,
}
