import {Router} from "express"
import fs from 'fs'
import ProductManager from '../manager/productManager.js';

//esta linea no estoy seguro de porque la importaste porque hasta lo que entiendo no se usa esa constante
const productManager = new ProductManager('./src/data/products.json');
const router = Router()


router.get("/realtimeproducts", async (req, res) => {
    try {
        // const products = await productManager.getProducts()
        res.render('realTimeProducts')
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

})

export default router