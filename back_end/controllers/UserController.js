const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET;


//Gerando o token do usuario (função auxiliar que ajuda gerar o token)
const generateToken = (id) =>{
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d",
    })
}
