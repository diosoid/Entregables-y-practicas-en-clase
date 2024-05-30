import ProductManager from "../manager/productManager.js";
const productManager = new ProductManager()

export const getAllProducts = async (req, res, next) =>{
    try {
        const products = await productManager.getAll()
        res.json(products)       
    } catch (error) {
        next (error)
        
    }
}