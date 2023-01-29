require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT

const app = express()

//configurar json e form data response
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})
