import { Router } from "express"
import fs from 'fs'
import ProductManager from '../manager/productManager.js';
const productManager = new ProductManager('./src/data/products.json');
const router = Router()

router.get("/vista3", (req, res) => {

    let user = {
        firstname: 'Raul',
        lastname: 'Perez',
        age: 25,
        email: 'raulperez.com',
        password: '123'
    }
    res.render('vista3', { user })
})

router.get("/prodList", async (req, res) => {
    let productsJSON = await fs.promises.readFile('./src/data/products.json', 'utf-8')
    let products = JSON.parse(productsJSON)
    res.render('listaDeProductos', { products })



})
router.get("/realtimeproducts", async (req, res) => {
    try {
        // const products = await productManager.getProducts()
        res.render('realTimeProducts')
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

})

export default router