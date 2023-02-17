const express = require('express')
const router = express.Router()

//Controller

//Middlewares
const { photoInsertValidation } = require('../middlewares/photoValidation')
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidaition')


//Routes

module.exports = router
