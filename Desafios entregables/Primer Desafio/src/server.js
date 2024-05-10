import express from 'express';
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';


app.use(express.static(__dirname + '/public'))
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)

app.use(errorHandler)

const PORT = 8080

app.listen(PORT, () =>console.log(`Server runing on port ${PORT}`)  )

