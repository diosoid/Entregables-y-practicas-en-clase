import { CartsModel } from "./models/cartModel.js";

 export default class CartDaoMongoDB {
    async create (){
        try {
            return await CartsModel.create({
                products:[]
            })
        } catch (error) {
            console.log(error)           
        }
    }
    async getAll (){
        try {
            return await CartsModel.find({})           
        } catch (error) {
            console.log(error)           
        }
    }
    async getById (id){
        try {
            return await CartsModel.findById(id).populate("products.product")            
        } catch (error) {
            console.log(error)           
        }
    }
    async delete (id){
        try {
            return await CartsModel.findByIdAndDelete(id)            
        } catch (error) {
            console.log(error)           
        }
    }
    async addProdToCart (catrId, prodId, quantity){
        try {
            // const cart = await CartsModel.findById(catrId)
            // if(!cart) return null;
            //busco si existe el prod en el cart
            const existProdInIndex = cart.products.findIndex(p => p.product.toString()  === prodId)
            if(existProdInIndex !== -1){               
                cart.products[existProdInIndex].quantity = quantity
            } else cart.product.push({product: prodId, quantity})
            return await cart.save()
            return cart        
        } catch (error) {
            console.log(error)           
        }
    }
    async existProdInCart(cartId, prodId){
       try {
   
           return await CartsModel.findOne({
               _id: cartId,
               products: {
                   $elemMatch: {
                       product: prodId
                   }
               }
           })
           
       } catch (error) {
           throw new Error(error)
           
       }
    }
 }
