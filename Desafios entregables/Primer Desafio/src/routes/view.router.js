import {Router} from "express"
import fs from 'fs'
import ProductManager from '../manager/productManager.js';

const productManager = new ProductManager('./src/data/products.json');
const router = Router()


router.get("/realtimeproducts", async (req, res) => {
    try {
        // const products = await productManager.getProducts()
        res.render('realTimeProducts')
    } catch (error) {
        res.status(500).json({ msg: error })
    }

})
router.get("/listadeproductos", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        console.log(products)
        res.render("listaDeProductos", {products: products})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/login", (req, res)=> {
    res.render("login")
})

router.get("/register", (req, res)=> {
    res.render("register")
})

router.get("/profile", (req, res) => {
    console.log(req.session)
    res.render("profile")
})

export default router