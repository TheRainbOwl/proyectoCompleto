const prices = document.querySelectorAll(".precio")
const totalPlace = document.getElementById("totalCompra")
const btnAccept = document.getElementById("Aceptar")
const btnDecline = document.getElementById("Rechazar")


let total = 0

prices.forEach(price =>{
    let priceFormat = Number((price.outerText).replace(/[^0-9\.]+/g, ""))
    total = priceFormat + total
})

totalPlace.innerHTML = `$${total}.00`

btnAccept.addEventListener("click", async ()=>{
    const dataToSend = {status: true}
    const response = await fetch("/accept-compra", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    })
    response
    location.reload(true)
})

btnDecline.addEventListener("click", async ()=>{
    const dataToSend = {status: true}
    const response = await fetch("/decline-compra", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    })
    response
    location.reload(true)
})
