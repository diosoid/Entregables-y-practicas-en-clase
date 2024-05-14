import express from 'express';
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars'
import router from './routes/view.router.js'
import { Server } from 'socket.io'
import ProductManager from './manager/productManager.js';
const productManager = new ProductManager("./src/data/products.json")


const app = express();
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/', router)

app.get('/', (req, res) => {
    res.render('websocket')
})

app.use(errorHandler)

const PORT = 3001

const httpServer = app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))

const socketServer = new Server(httpServer)

const products = []

socketServer.on('connection', async (socket) => {

    console.log(`New client connected ${socket.id}`)
    socket.on('disconnect', () => {
        console.log(`Client disconnected ${socket.id}`)
    })

    // socket.emit('saludoDesdeBack', 'Bienvenido a web socket')

    // socket.on('respuestadesdefront', (message) => {
    //     console.log(message)
    // })

    // socket.on('newProduct', (prod) => {
    //     products.push(prod)
    //     socket.emit('products', products)
    // })
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
})


