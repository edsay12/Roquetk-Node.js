export default function Modal() {

    // pegando botao cancelar
    const cancel = document.querySelector(".button.cancel")
    cancel.addEventListener("click",event => {
        close()
    })

    function open(){
        // atribui a class active para a modal
       document.querySelector(".modal-wrapper").classList.add("active")
    }
    function close(){
        //remove a classe active da modal 
        document.querySelector(".modal-wrapper").classList.remove("active")
    }
    return{open,close} 
    
    
}


