
//const fs = require('fs');
import fs from "fs"
import {v4 as uuidv4} from 'uuid'

export default class ProductManager {   
    constructor (path) {
        this.path = path;
        //this.products = [];
    } 

    async getProducts () {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(products)
                //this.products = JSON.parse(products)
                //return this.products
            } else return []
            
        } catch (error) {
            console.log(error)          
        }
        
    }
    

    async addProduct (title , description ,price ,thumbnail , code ,stock ) {
        try {
            const products = await this.getProducts()
            const checkCode = await products.find((e) => e.code === code);
            if (checkCode) {
                throw new Error ("Product" + title + "has already been added")
            // return  console.log ("El articulo ya fue ingresado, por favor ingrese un producto diferente");
            }
            if (!title || !description || !price || !thumbnail || !code || !stock){
                // return console.log('Todos los campos son obligatorios')
                throw new Error ("Todos los campos son obligatorios")
            }
            const product = {
                id: uuidv4(),
                //this.#getMaxid() + 1 ,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            products.push(product);                   
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4), 'utf8');
            return product;            
        } catch (error) {
            throw new Error ("Se produjo un error inesperado aca codigo 666")           
        }    
    }     

    // METODOS ANTERIORES (Get MAX)

    // #getMaxid(){
    //     let maxId = 0;
    //     this.products.map((product) => { 
    //     if (product.id > maxId) maxId = product.id;
    //     });
    //     return maxId;
    // }
        

    
    async getProductByid (id) {

        const products = await this.getProducts()
        const productExist = products.find((e) => e.id === id)

        if (productExist) {
            return productExist;
        }
        throw new Error ("Product not found")

        //return  console.log ("Product not found");
        //const products = await fs.promises.readFile(this.path, 'utf8');
        //this.products = JSON.parse(products)       
        //const  getProdByID = this.products.find((e) => e.id === id);        
        // if (getProdByID) {
        //     return getProdByID;
        // }
       
    };

    async updateProduct(id, updatedProperties) {
        const products = await this.getProducts(); 
        const productToUpdateIndex = products.findIndex(product => product.id === id);
    
        if (productToUpdateIndex !== -1) {           
            products[productToUpdateIndex] = { ...products[productToUpdateIndex], ...updatedProperties };          
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4), 'utf8');
    
            return products[productToUpdateIndex]; 
        } else {
           
            return null; 
        }
    }   

    //Update version 3

    //Update version 2

    // async updateProduct(id, updatedProperties) {
    // const productToUpdate = await this.getProductByid(id);
    // if (productToUpdate) {
    //     Object.assign(productToUpdate, updatedProperties);

    //     await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 4), 'utf8');
    //     return productToUpdate;
    // }
    // }
    // Update version 1
    // async updateProduct (id, title, description, price, thumbnail, code, stock) {
    //     const updateProduct = await this.getProductByid(id)
    //     if (updateProduct) {
    //         updateProduct.title = title;
    //         updateProduct.description = description;
    //         updateProduct.price = price;
    //         updateProduct.thumbnail = thumbnail;
    //         updateProduct.code = code;
    //         updateProduct.stock = stock;
    //         await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf8');
    //         return updateProduct;
    //      }
    // }

    
    async deleteProduct(id) {
        try {
            let products = await this.getProducts();       
            const deleteProductIndex = products.findIndex(product => product.id === id);
            if (deleteProductIndex !== -1) {              
                const deletedProduct = products.splice(deleteProductIndex, 1)[0];          
                await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf8');   
                return deletedProduct; 
            } else {
                throw new Error("Product not found");
            }
        } catch (error) {
            throw new Error("Error deleting product: " + error.message);
        }
    }
    
//MI METODO DELETE VIEJO QUE NO FUNCIONA Y NO SE PORQUE //
    // async deleteProduct (id) {
    //     const deleteProduct = await this.getProductByid(id)
    //     if (deleteProduct) {
    //          products = products.filter((e) => e.id!== id);
    //         await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf8');
    //         return deleteProduct;
    //     }
    //     return console.log("Product not found");
    // }
}








