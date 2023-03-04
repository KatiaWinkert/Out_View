const multer = require('multer')
const path = require('path')

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = ''

    if (req.baseUrl.includes('users')) {
      folder = 'users'
    } else if (req.baseUrl.includes('photos')) {
      folder = 'photos'
    }
    callback(null, `uploads/${folder}/`)
  },
  filename: (req, file, cb) => {
    callback(null, Date.now() + path.extname(file.originalname))
  },
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return callback(new Error('Por favor, envie apenas png, jpg ou jpeg!'))
    }
    callback(undefined, true)
  },
})

module.exports = { imageUpload }
