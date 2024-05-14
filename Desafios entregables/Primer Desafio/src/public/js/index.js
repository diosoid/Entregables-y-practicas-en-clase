const socketClient = io()

socketClient.on('saludoDesdeBack', (message) => {
    console.log(message)
    socketClient.emit('respuestadesdefront', 'muchas gracias')
})

// const form2 = document.getElementById('form2')
// const inputName = document.getElementById('name')
// const inputPrice = document.getElementById('price')
// const products = document.getElementById('products')

// form2.onsubmit = (e) => {
//     e.preventDefault()
//     const name = inputName.value;
//     const price = inputPrice.value;
//     const product = {
//         name,
//         price
//     }
//     socketClient.emit('newProduct', product)
// }

// socketClient.on('products', (arrayProducts) => {
//     let infoProducts = ''
//     arrayProducts.map((prod) => {
//         infoProducts += `${prod.name} - $${prod.price}</br>`
//     })
//     products.innerHTML = infoProducts
// })

const form = document.getElementById("product-form-add")
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const newProductData = Object.fromEntries(formData.entries())
    socketClient.emit("newProductData", newProductData)
})

const updateTable = (products) => {
    let bodyTable = document.getElementById('body-table')
    bodyTable.innerHTML = ``
    products.forEach(prod => {
        const fila = document.createElement('tr')
        fila.innerHTML = `  <td>${prod.title}</td>
                            <td>${prod.description}</td>
                            <td>${prod.price} </td>
                            <td>${prod.code}</td>
                            <td>${prod.stock}</td>
                            <td>${prod.category}</td>
                            <td>${prod.status}</td>
                            <td>${prod.id}</td>`
        bodyTable.appendChild(fila)
    });
}
socketClient.on('productsData', (products) => {
    updateTable(products)
})


