const { Router } = require("express");
const express = require("express")

const route = express.Router()
const QuestionControle = require("../controllers/QuestionControler")
const RoomControler = require("../controllers/RoomControle")

route.get("/",(req,res)=>{res.render("index",{page:"enter-room"})});
route.get("/create_pass",(req,res)=>{res.render("index",{page:"create-pass"})});

route.get("/room/:room",RoomControler.open);
route.post("/create-room",RoomControler.create)
route.post("/enterRoom",RoomControler.enter)

route.post("/question/:room/:question/:action",QuestionControle.index)
route.post("/question/create/:room",QuestionControle.create)

module.exports = route

// para mostrar as variaveis no arqiuvo ejs <%= req.params.romm %>