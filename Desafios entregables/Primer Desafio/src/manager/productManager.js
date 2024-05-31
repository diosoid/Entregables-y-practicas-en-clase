import fs from "fs"
import {v4 as uuidv4} from 'uuid'
import { model } from "mongoose"

export default class ProductManager {  
    //Metodos Mongoose  
    constructor (collection, schema) {
        this.collection = model (collection, schema);        
    } 
    async getAll (){
        try {
            return await this.collection.find({})
        } catch (error) {
            throw new Error(error)
        }}
    async getById (id){
        try {
            return await this.collection.findById(id)
        } catch (error) {
            throw new Error(error)
        }}
    async create (obj){
        try {
            return await this.collection.create(obj)
        } catch (error) {
            throw new Error(error)
        }}
    async update (id,obj){
        try {
            return await this.collection.findByIdAndUpdate(id, obj, {new: true})
        } catch (error) {
            throw new Error(error)
        }}
    async delete (id){
        try {
            return await this.collection.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error)
        }}




    //Metodo original
    // constructor (path) {
    //     this.path = path;        
    // } 

    // async getProducts () {
    //     try {
    //         if(fs.existsSync(this.path)){
    //             const products = await fs.promises.readFile(this.path, 'utf8');
    //             return JSON.parse(products)               
    //         } else return []           
    //     } catch (error) {
    //         throw new Error ("No product was found.")           
    //     }
        
    // }
    

    // async addProduct (title , description ,price ,thumbnails, code ,stock ) {
    //     try {
    //         const products = await this.getProducts()
    //         const checkCode = await products.find((e) => e.code === code);
    //         if (checkCode) {
    //             throw new Error ("Product" + title + "has already been added")
    //         }
    //         if (!title || !description || !price || !code || !stock){            
    //             throw new Error ("Todos los campos son obligatorios")
    //         }
    //         const product = {
    //             id: uuidv4(),               
    //             title,
    //             description,
    //             price,
    //             status: true,
    //             thumbnails,
    //             code,
    //             stock
    //         }
    //         products.push(product);                   
    //         await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4), 'utf8');
    //         return product;            
    //     } catch (error) {
    //         throw new Error (error)           
    //     }    
    // }     

    
    // async getProductByid (id) {

    //     const products = await this.getProducts()
    //     const productExist = products.find((e) => e.id === id)

    //     if (productExist) {
    //         return productExist;
    //     }
    //     throw new Error ("Product not found")

      
       
    // };

    // async updateProduct(id, updatedProperties) {
    //     const products = await this.getProducts(); 
    //     const productToUpdateIndex = products.findIndex(product => product.id === id);
    
    //     if (productToUpdateIndex !== -1) {           
    //         products[productToUpdateIndex] = { ...products[productToUpdateIndex], ...updatedProperties };          
    //         await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4), 'utf8');
    
    //         return products[productToUpdateIndex]; 
    //     } else {
           
    //         throw new Error ("Product wan unable to be updated.")
    //     }
    // }   
    
    // async deleteProduct(id) {
    //     try {
    //         let products = await this.getProducts();       
    //         const deleteProductIndex = products.findIndex(product => product.id === id);
    //         if (deleteProductIndex !== -1) {              
    //             const deletedProduct = products.splice(deleteProductIndex, 1)[0];          
    //             await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf8');   
    //             return deletedProduct; 
    //         } else {
    //             throw new Error("Product not found");
    //         }
    //     } catch (error) {
    //         throw new Error("Error deleting product: " + error.message);
    //     }
    // }
    

}


//Thumbnail lo saque de la validacion porque no es obligatorio pero no entendi eso de que ahora es thumnails y debe ser un array ? que deberia hacer en ese caso. 





