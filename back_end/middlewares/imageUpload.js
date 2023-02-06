const multer = require('multer') // responsavel por upload de arquivos
const path = require('path') // modulo padrão do node. responsavel pelos metodos e diretorios que estamos trabalhando na aplicação

// função: destino da imagem salva - destination to store image
const imageStore = multer({
  //mudança de destino padrão
  destination: (req, file, cb) => {
    let folder = ''

    if (req.baseUrl.includes('users')) {
      folder = 'users'
    } else if (req.baseUrl.includes('photos')) {
      folder = 'photos'
    }
    cb(null, `uploads/${folder}/`)
  },
  //mudançã de arquivo padrão:
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // 784e4564546sa54564.jpg
  },
})

//faz uma pequena validação e define onde a imagem vai ser salva.
const imageUpload = multer({
  Storage: imageStore,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg formats

      return cb(new Error('Por favor, envie apenas png ou jpg!'))
    }
    cb(undefined, true)
  },
})

module.exports = { imageUpload }
