const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: String,
    emali: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    //marca a data em que o usuario vai ser criado ou atualizado. é interessando para sistema que dependende da data
    //para alguma coisa.
    timestamps: true,
  }
)

//User = mongoose.model('User', userSchema)

//module.exports = User
module.exports = User = mongoose.model('user', userSchema)
