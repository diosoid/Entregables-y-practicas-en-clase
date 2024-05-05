import { Router } from "express";
const router = Router();

import ProductManager from '../manager/productManager.js';
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res, next) => {
    
    try {
        const limit = parseInt(req.query.limit);
        let products = await productManager.getProducts();
        if (!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit);
        }
        res.status(200).json(products)        
        
    } catch (error) {
        next(error)       
    }    
})

router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const product = await productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.status(201).json(product);
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
router.get ('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await productManager.getProductByid(id)
        if(!product) res.status(404).json({msg: 'Product not found'})
        else res.status(200).json(product)


    } catch (error) {
        next(error)       
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProperties = req.body;
        const prodUpdate = await productManager.updateProduct(id, updatedProperties);

        if (!prodUpdate) {
            return res.status(404).json({ msg: 'Error updating product' });
        }
        res.status(200).json(prodUpdate);
    } catch (error) {        
        res.status(500).json({ msg: error.message });
    }
});



router.delete ('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const deletedProduct = await productManager.deleteProduct(id)
        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json({msg: `Product id: ${id} deleted successfully`})

    } catch (error) {
        res.status(500).json({msg: error.message})        
    }
})

export default router;