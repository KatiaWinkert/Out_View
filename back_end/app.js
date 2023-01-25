const express = require("express")
const path = require("path")
const cors = require("cors")

const port = 5000;

const app = express()

//configurar json e form data response 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(port, () => {
console.log(`App rodando na porta ${port}`)
})