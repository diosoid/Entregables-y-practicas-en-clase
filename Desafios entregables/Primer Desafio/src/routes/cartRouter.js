import {Router} from "express"
import * as controller from "../controllers/cartController.js"

const router = Router()

import CartManager from "../manager/cartManager.js";
import {__dirname} from "../path.js"
const cartManager = new CartManager( `${__dirname}/data/carts.json` )

router.post ("/:idCart/product/:idProd", async (req,res, next) =>{
    try {
        const {idCart} =req.params
        const {idProd} =req.params
        const response = await cartManager.addProductToCart(idCart, idProd)
        res.json(response)
    } catch (error) {
        next(error)
        
    }
})

router.post("/", controller.create)
router.post("/:idCart/products/:idProd", controller.addProdToCart)
router.delete("/:idCart/products/:idProd", controller.removeProdFromCart)
router.put("/:idCart/products/:idProd", controller.updateProdQuantityToCart)

//Metodo viejo
// router.post("/", async (req,res, next)  => {
//     try {
//         const response = await cartManager.createCart()
//         res.json(response)        
//     } catch (error) {
//         next(error)
//     }
// })

router.get("/:idCart", async (req,res, next) =>{
    try {
        const {idCart} = req.params
        res.json(await cartManager.getCartByid(idCart))
    } catch (error) {
        next (error)
    }
})

export default router
