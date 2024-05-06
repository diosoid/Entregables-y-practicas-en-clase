import express from 'express';
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import { __dirname } from './path.js';
import { errorHandler } from './middlewares/errorHandler.js';

// import ProductManager from './manager/productManager.js';
// const productManager = new ProductManager('./products.json');
const app = express();
app.use(express.static(__dirname + '/public'))
app.use(express.json())
// esta parte estaba en el codigo del profe de la clase no estoy seguro si es necesaria o
app.use(express.urlencoded({extended: true}))

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)

app.use(errorHandler)

const PORT = 8080

app.listen(PORT, () =>console.log(`Server runing on port ${PORT}`)  )


//Codigo de rutas anterior lo guardo por si se rompe algo.
// app.get('/products', async (req, res) => {
    
//     try {
//         const limit = parseInt(req.query.limit);
//         let products = await productManager.getProducts();
//         if (!isNaN(limit) && limit > 0) {
//             products = products.slice(0, limit);
//         }
//         res.status(200).json(products)        
        
//     } catch (error) {
//         res.status(500).json({msg: error.message})        
//     }    
// })

// app.post('/products', async (req, res) => {
//     try {
//         const { title, description, price, thumbnail, code, stock } = req.body;
//         const product = await productManager.addProduct(title, description, price, thumbnail, code, stock);
//         res.status(201).json(product);
        
//     } catch (error) {
//         res.status(500).json({ msg: error.message });
//     }
// });
// app.get ('/products/:id', async(req, res)=>{
//     try {
//         const {id} = req.params
//         const product = await productManager.getProductByid(id)
//         if(!product) res.status(404).json({msg: 'Product not found'})
//         else res.status(200).json(product)


//     } catch (error) {
//         res.status(500).json({msg: error.message})        
//     }
// })

// app.put('/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedProperties = req.body;
//         const prodUpdate = await productManager.updateProduct(id, updatedProperties);

//         if (!prodUpdate) {
//             return res.status(404).json({ msg: 'Error updating product' });
//         }
//         res.status(200).json(prodUpdate);
//     } catch (error) {        
//         res.status(500).json({ msg: error.message });
//     }
// });



// app.delete ('/products/:id', async(req, res)=>{
//     try {
//         const {id} = req.params
//         const deletedProduct = await productManager.deleteProduct(id)
//         if (!deletedProduct) {
//             return res.status(404).json({ msg: 'Product not found' });
//         }
//         res.status(200).json({msg: `Product id: ${id} deleted successfully`})

//     } catch (error) {
//         res.status(500).json({msg: error.message})        
//     }
// })


//METODOS Y PRUEBAS VIEJAS

        // app.put ('/products/:id', async(req, res)=>{
        //     try {
        //         //const {id} = req.params
        //         const { id } = req.params;
        //         const updatedProperties = req.body
        //         const prodUpdate = await productManager.updateProduct(id, updatedProperties)
        //         if(!prodUpdate)res.status(404).json({msg: 'Error updating product'})
        //         res.status(200).json(prodUpdate)
        
        //     } catch (error) {
        //         res.status(500).json({msg: error.message})        
        //     }
        // })

// app.post('/products', async (req, res) => {
//     try {
//         const product = await productManager.addProduct(req.body)
//         res.status(201).json(product)
        
//     } catch (error) {
//         res.status(500).json({msg: error.message})        
//     }
// })

//Correcion de chat GPT a mi metodo post que no andabaS