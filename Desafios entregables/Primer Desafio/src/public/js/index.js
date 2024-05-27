const socketClient = io()

socketClient.on('saludoDesdeBack', (message)=>{
    console.log(message)
    socketClient.emit('respuestadesdefront', 'muchas gracias')
})


const form = document.getElementById("product-form-add")
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form) 
    const newProductData = Object.fromEntries(formData.entries())
    
    socketClient.emit("newProductData", newProductData)
})

socketClient.on('productsData', (products) => {
    updateTable(products)
})

// const deleteProd = document.getElementById("product-form-delete")
// deleteProd.addEventListener('submit', (event) => {
//     event.preventDefault()
//      const deleteInfo = new FormData(deleteProd) 
//      const newDelteData = Object.fromEntries(deleteInfo.entries())
    
//     socketClient.emit("newDeleteData", newDeleteData)
// })

const productFormDelete = document.getElementById('product-form-delete')
  productFormDelete.addEventListener('submit', (event) => { //agregamos el event listener para cuando se haga clic en el boton
  event.preventDefault()
  let id = document.getElementById('id').value
  console.log(id)
   //agarramos el value (id del producto) del input del formulario
  socketClient.emit('deleteProduct', id) //y lo mandamos al back
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

socketClient.on('products', (arrayProducts) =>{
    let infoProducts = ''
    arrayProducts.map((prod) =>{
        infoProducts += `${prod.name} - $${prod.price}</br>`
    })
    products.innerHTML = infoProducts
})


