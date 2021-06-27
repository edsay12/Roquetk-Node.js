import Modal from "./modal.js"

const modal = Modal()

// informaçoes para o modal
const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".modal button")
// pegar todos os botoes com a classe check

// TODOS OS BOTOE SCOM A CLASSE DELETE
const deleteButton = document.querySelectorAll(".actions a.delete")
// adicionar um event listener em todos os botoes check
const check = document.querySelectorAll(".actions a.check")
// tela de fundo 
    
// adicionando evento   
check.forEach((button) => {
    //adiciona a escuta no botao
    button.addEventListener("click", (event) => handClick(event))

})

// adicionando evento
deleteButton.forEach((deletar) => {
    deletar.addEventListener("click", (event) => handClick(event, false))

});

function handClick(event, check = true) {
    event.preventDefault()
    modalTitle.innerHTML = check ? "Marcar como lido" : "Excluir essa pergunta"
    modalDescription.innerHTML = check ? "Voce tem certeza que deseja marcar como visualizado?" : "Tem certeza que voce deseja excluir esta pergunta?"
    modalButton.innerHTML = check ? "Sim,Lido" : "Sim,Excluir"
    modalButton.style.background = check ? "green" : "var(--blue)"
    modal.open()


// id da sala
const roomId = document.querySelector("#room-id").dataset.id // pega o data-id da sala 
const slug = check ? "check" : "delete"
const questionId = event.target.dataset.id //aqui e usado o event pois ele ja pega todo o bottao ao fazer o evento

// formulario
const form = document.querySelector(".modal form")
form.setAttribute("action",`/question/${roomId}/${questionId}/${slug}`)   //adiciona o id no formulario


}


