const socketClient = io()

socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message)
    socketClient.emit('respuestadesdefront', 'muchas gracias')
})

const form = documnet.getElementById('form')
const inputName = documnet.getElementById('name')
const inputPrice = documnet.getElementById('price')
const products = documnet.getElementById('products')

form.onsubmit = (e) =>{
    e.preventDefault()
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price
    }
    socketClient.emit('newProduct', product)
}

socketClient.on('products', (arrayProducts) =>{
    let infoProducts = ''
    arrayProducts.map((prod) =>{
        infoProducts += `${prod.name} - $${prod.price}</br>`
    })
    products.innerHTML = infoProducts
})


