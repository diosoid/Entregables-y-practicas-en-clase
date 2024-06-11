import ProductManagerDaoMongoDB from "../daos/mongodb/productDao.js";
const prodDao = new ProductManagerDaoMongoDB()

import CartDaoMongoDB from "../daos/mongodb/cartDao.js";
const cartDao = new CartDaoMongoDB()

export const getAll = async () => {
    try {
        return await cartDao.getAll()
    } catch (error) {
        console.log(error)      
    }
}
export const getById = async (id) => {
    try {
        const cart = await cartDao.getById(id)
        if (!cart) return false;
        else return cart       
    } catch (error) {
        console.log(error)      
    }
}
export const create = async () => {
    try {
        const newcart = await cartDao.create()
        if(!newcart) return false
        else return newcart
        
    } catch (error) {
        console.log(error)      
    }
}
export const update = async (id, obj) => {
    try {
        const cartUpd = await cartDao.update(id, obj)
        if(!cartUpd) return false
        else return cartUpd
        
    } catch (error) {
        console.log(error)      
    }
}
export const remove = async (id) => {
    try {
        const cartDel = await cartDao.delete(id)
        if(!cartDel) return false
        else return cartDel
        
    } catch (error) {
        console.log(error)      
    }
}
export const addProdToCart = async (cartId, prodId) => {
    try {
        const existCart = await getById(cartId)
        const existProd = await prodDao.getById(prodId)
        if(!existCart || !existProd) return null
        const existProdInCart = await cartDao.existProdInCart(cartId, prodId)
        if(existProdInCart) {
            const quantity = existProdInCart.products.find(p => p.product.toString()=== prodId).quantity + 1;
            return await cartDao.addProdToCart(cartId, prodId, quantity)
        }
        return await cartDao.addProdToCart(cartId, prodId)
    } catch (error) {
        console.log(error)      
    }
}