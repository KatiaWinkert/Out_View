const express = require('express')
const router = express.Router()

// Controller
const {
  register,
  getCurrentUser,
  login,
  update,
  getUserByID,
} = require('../controllers/UserController')

//Middlewares
const validate = require('../middlewares/handleValidaition')
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')
const { imageUpload } = require('../middlewares/imageUpload')

// Routes
router.post('/register', userCreateValidation(), validate, register)
router.get('/profile', authGuard, getCurrentUser)
router.post('/login', loginValidation(), validate, login)
router.put(
  '/',
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single('profileImage'),
  update
)
router.get('/:id', getUserByID)

module.exports = router
