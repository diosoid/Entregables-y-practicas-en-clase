import express from 'express';
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars'
import router from './routes/view.router.js'
import { Server } from 'socket.io'
import ProductManager from './manager/productManager.js';

//Quizas sea una pregunta muy basica pero en esta linea estas asignando a la variable productManager una nueva instancia de la clase, hasta ahi lo entiendo pero porque le pasas la ruta del json con la data por parametros no entiendo esa parte.
const productManager = new ProductManager("./src/data/products.json")


const app = express();
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/', router)

//Poor ahora fuera de uso
// app.get('/', (req, res) => {
//     res.render('websocket')
// })

app.use(errorHandler)

const PORT = 8080

const httpServer = app.listen(PORT, () =>console.log(`Server runing on port ${PORT}`)  )

const socketServer = new Server(httpServer)


socketServer.on('connection', async (socket)=>{

    console.log(`New client connected ${socket.id}`)
    socket.on('disconnect', ()=>{
        console.log(`Client disconnected ${socket.id}`)
    })

    
    const productsData = await productManager.getProducts()
    socket.emit("productsData", productsData)
    socket.on("newProductData", async (prod) => {
        await productManager.addProduct(prod.title,
            prod.description,
            prod.price,
            prod.thumbnails,
            prod.code,
            prod.stock,
            prod.category)
    })
    socket.on('deleteProduct', async (id) => { //lo recibimos en el back
        await productManager.deleteProduct(id) //utilizamos el delete que armamos en el product manager  
        console.log(id) 
        socket.emit('productsData', products) //actualizamos la tabla   
        console.log(products)
    })

//hola
    // const prodToDelete = await productManager.getProducts()
    // socket.emit("prodToDelete", prodToDelete)
    // socket.on("deleteProduct", async (prod) => {
    //     await productManager.deleteProduct(prod.id)
    // })

})


