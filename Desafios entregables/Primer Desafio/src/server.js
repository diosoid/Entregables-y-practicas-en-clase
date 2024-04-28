import express from 'express';
import ProductManager from './manager/productManager.js';

const productManager = new ProductManager('./products.json');


const app = express();

app.use(express.json())

app.get('/products', async (req, res) => {
    
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products)        
    } catch (error) {
        res.status(500).json({msg: error.message})        
    }    
})

// app.post('/products', async (req, res) => {
//     try {
//         const product = await productManager.addProduct(req.body)
//         res.status(201).json(product)
        
//     } catch (error) {
//         res.status(500).json({msg: error.message})        
//     }
// })

//Correcion de chat GPT a mi metodo post que no andabaS
app.post('/products', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const product = await productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.status(201).json(product);
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


const PORT = 8080

app.listen(PORT, () =>console.log(`Server runing on port ${PORT}`)  )