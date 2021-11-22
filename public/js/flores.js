
const btnMas = document.querySelectorAll(".mas")
const btnMenos = document.querySelectorAll(".menos")
const cantidad = document.querySelectorAll(".cantidad")
const btnBuy = document.querySelectorAll(".comprar")
const divsCompletes = document.querySelectorAll(".container-flower")

for(let i = 0; i < btnMas.length; i++){
    btnMas[i].addEventListener("click", ()=>{
        let numberInside = cantidad[i].innerText 
        cantidad[i].innerHTML = `${parseInt(numberInside) + 1}`
    })
}

for(let i = 0; i < btnMenos.length; i++){
    btnMenos[i].addEventListener("click", ()=>{
        let numberInside = cantidad[i].innerText 
        if(numberInside >= 1){
            cantidad[i].innerHTML = `${parseInt(numberInside) - 1}`
        }
    })
}

for(let i = 0; i < btnBuy.length; i++){
    btnBuy[i].addEventListener("click", async () =>{
        
        // To get the name of the flower
        const divInside = divsCompletes[i].childNodes
        const divSecondPart = divInside[1].childNodes
        const divName = divSecondPart[1].childNodes
        const name = divName[1].outerText
        
        // To get the number of flowers
        const divThirdPart = divInside[2].childNodes
        const divNumber = divThirdPart[3].childNodes
        const number = divNumber[2].outerText
        
        // To send to server
        if(number > 0){
            const dataToSend = {nombre: name, size: parseInt(number)}
            const response = await fetch("/send-compra", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            })
            response
            location.reload(true)
        }
    })
}