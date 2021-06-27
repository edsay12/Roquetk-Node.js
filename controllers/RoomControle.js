const Database = require("../src/db/config")
module.exports = {

   async create(req, res) {
      const db = await Database()
      const pass = req.body.password
      let roomId = ""
      let isroom = true

      while (isroom) {
         if (pass == "") {
            res.redirect("/create_pass")
            console.log("Porfavor adicione uma senha")
            break

         } else {
            for (var i = 0; i < 6; i++) {
               roomId += Math.floor(Math.random() * 10).toString()
            }
            // verifica se o numero ja existe  all usa quando eo banco retorna algo
            const rooms_id = await db.all(`select id from rooms`)
            //   .some retorna true se tiver uma ocorencia igual
            isroom = rooms_id.some(rooms_id => rooms_id === roomId)
            console.log(isroom)
         }
      }
      if (!isroom) {
         await db.run(`INSERT INTO rooms values(${Number(roomId)},"${pass}")`)
         res.redirect(`/room/${roomId}`)
      }

   }, async open(req, res) {
      const db = await Database()
      
      var roomId = req.params.room   // PARAMS pega pelo link do site
      let questions = await db.all(`SELECT * FROM questions where ${roomId} = room and  read = 0`)
      let questionsRead = await db.all(`SELECT * FROM questions where ${roomId} = room and read = 1`)
      let isQuestions = true

      if( questions.length == 0 ){
         if(questionsRead.length == 0){
            isQuestions = false 
         }
      }

      const sala = await db.get(`SELECT * FROM rooms where id = ${roomId}`)
      if (sala != undefined){
         console.log(sala)
         res.render("room", { room_Id: roomId, questions: questions, questionsRead: questionsRead,isQuestions:isQuestions })
      }else{
         res.redirect(`/`)
      }
      
   },

   async enter(req, res) {
      const db = await Database()
      const sala = req.body.roomEnter
      const retorno = await db.get(`SELECT * FROM rooms where id = ${sala}`)
      if(retorno != undefined){
         res.redirect(`/room/${sala}`)
      }else{
         res.redirect(`/`)
      }

   }

}