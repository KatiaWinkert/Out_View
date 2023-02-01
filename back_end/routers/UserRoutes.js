const express = require('express')
const router = express.Router()

// Controller
const { register } = require('../controllers/UserController')

//Middlewares
const validate = require('../middlewares/handleValidaition')
const { userCreateValidation } = require('../middlewares/userValidations')

// Routes
router.post('/register', userCreateValidation(), validate, register)

module.exports = router
