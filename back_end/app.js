require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')

const port = process.env.PORT

const app = express()

//configurar json e form data response
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//solve cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// diretorio de upload de imagens
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//DB connection - conexão com banco de dados:
require('./config/db.js')

// routers
const router = require('./routers/Router')
app.use(router)

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})
