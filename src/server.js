const { urlencoded } = require("express")
const express = require("express")
const server = express()
const routes = require("./routes")

//configurando o motor de visualização para EJS.
server.set("view engine", "ejs")

//Enable static assets
server.use(express.static("public"))

//Usar o req.body
server.use(express.urlencoded({ extended: true}))

//Routes
server.use(routes)

//configuração da porta
server.listen(3000, () => console.log(""))