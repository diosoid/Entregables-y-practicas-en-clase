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
    async addProdToCart (cartId, prodId, quantity){
        try {
            const cart = await CartsModel.findById(cartId)
            if(!cart) return null;
            //busco si existe el prod en el cart
            const existProdInIndex = cart.products.findIndex(p => p.product.toString()  === prodId)

            if(existProdInIndex !== -1){               
                cart.products[existProdInIndex].quantity = quantity
            } else cart.products.push({product: prodId, quantity})
            await cart.save()
            return cart        
        } catch (error) {
            console.log(error)           
        }
    }
    async existProdInCart(cartId, prodId){
       try { 
           return await CartsModel.findOne({
               _id: cartId,
               products: {$elemMatch: {product: prodId}}
           })
       } catch (error) {
           throw new Error(error)         
       }
    }
    async removeProdToCart(cartId, prodId){
       try {
        return await CartsModel.findOneAndUpdate(
            {_id: cartId},
            {$pull: {products: {product: prodId}}},
            {new: true}
        )       
       } catch (error) {
        throw new Error(error)   
       }
    }
    async update(id, obj){
       try {
        const response = await CartsModel.findByIdAndUpdate(id, obj, {
            new: true,
        })  
        return response    
       } catch (error) {
        console.log(error)
       }
    }
    async updateProdQuantityToCart (cartId, prodId, quantity) {
        try {
            return await CartsModel.findByIdAndUpdate(
                {_id: cartId, 'products.products':prodId},
                {$set: {'products.$.quantity': quantity}},
                {new: true}
            )
        } catch (error) {
            console.log(error)          
        }
    }
    async clearCart (cartId) {
        try {
            return await CartsModel.findByIdAndUpdate(
                cartId, 
                {$set: {products:[]}},
                {new: true}
            )
        } catch (error) {
            console.log(error)          
        }
    }


 }
