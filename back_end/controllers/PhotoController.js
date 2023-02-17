const Photo = require('../models/Photo')

const mongoose = require('mongoose')

//inserir foto, com usuario relacionado a ela. - insert a photo, whit an user related to it

const insertPhoto = async (req, res) => {
  const { title } = req.body
  const image = req.file.filename

  console.log(req.body)

  res.send('Photo insert')
}

module.exports = {
  insertPhoto,
}
