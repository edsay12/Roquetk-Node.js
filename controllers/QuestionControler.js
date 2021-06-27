const Database = require("../src/db/config")

module.exports = {
   async index(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
        

        // verificar se a senha esta correta  db.get tras um unico elemento do banco 
        const verifyRoom = await db.get(`SELECT * FROM rooms where id = ${roomId}`)
        console.log(verifyRoom.pass)
        if (verifyRoom.pass == password){
            if (action == "check"){
               await db.run(`UPDATE questions set read = ${1} where id = ${questionId}`)
            }else if(action == "delete"){
                await db.run(`Delete FROM questions WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)

        }else{

            res.render('passIncorrect',{roomId:roomId})
        }
        

        console.log(roomId)
        console.log(questionId)
        console.log(action)
        console.log(password)
    },
    async create(req, res) { 
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room
        await db.run(`INSERT INTO questions(title,room,read) values ("${question}",${roomId},0)`)
        res.redirect(`/room/${roomId}`)
    }
}