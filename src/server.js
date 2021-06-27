const express = require("express")
const server = express()
const route = require("./route")
// server para pegar o caminho da pasta onde esta o projeto

// PATH CAMINHO ONDE ESTA O PROJETO ___DIRNAME NOME DA PASTA JOIN JUNTA OS DOIS 
const path = require("path")

// definindo o ejs como engine template
server.set('view engine','ejs')

// falando onde esta a pasta views  __dirname peda o nome da pasta onde o serve esta
server.set("views",path.join(__dirname,"views"))
// FALANDO ONDE ESTA NOSSA PASTA DO CSS,JS (arquivos estaticos) 
server.use(express.static("public"))

// midware me permite pegar os dados do input
server.use(express.urlencoded({extended:true}))

// rotas
server.use(route)


server.listen(8081,()=>{
    console.log("server iniciado na porta 8081")
})

