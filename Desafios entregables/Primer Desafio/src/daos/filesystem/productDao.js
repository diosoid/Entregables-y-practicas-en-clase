import fs from "fs"
import {v4 as uuidv4} from 'uuid'

export default class ProductManagerDaoFs {  

    //Metodo original
    constructor (path) {
        this.path = path;        
    } 

    async getAll () {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(products)               
            } else return []           
        } catch (error) {
            throw new Error ("No product was found.")           
        }}
    
    async create (title , description ,price ,thumbnails, code ,stock ) {
        try {
            const products = await this.getAll()
            const checkCode = await products.find((e) => e.code === code);
            if (checkCode) {
                throw new Error ("Product" + title + "has already been added")
            }
            if (!title || !description || !price || !code || !stock ){            
                throw new Error ("Todos los campos son obligatorios")
            }
            const product = {
                id: uuidv4(),               
                title,
                description,
                price,
                status: true,
                thumbnails,
                code,
                stock,
                
            }
            products.push(product);                   
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4), 'utf8');
            return product;            
        } catch (error) {
            throw new Error (error)           
        } }     
    
    async getByID (id) {

        const products = await this.getAll()
        const productExist = products.find((e) => e.id === parseInt(id))

        if (productExist) {
            return productExist;
        }
        throw new Error ("Product not found")      
    };

    async update(id, updatedProperties) {
        const products = await this.getAlls(); 
        const productToUpdateIndex = products.findIndex(product => product.id === id);
    
        if (productToUpdateIndex !== -1) {           
            products[productToUpdateIndex] = { ...products[productToUpdateIndex], ...updatedProperties };          
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4), 'utf8');
    
            return products[productToUpdateIndex]; 
        } else {
           
            throw new Error ("Product wan unable to be updated.")
        }
    }   
    
    async delete(id) {
        try {
            let products = await this.getAll();       
            const deleteProductIndex = products.findIndex(product => product.id === id);
            if (deleteProductIndex !== -1) {              
                const deletedProduct = products.splice(deleteProductIndex, 1)[0];          
                await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf8');   
                return deletedProduct; 
            } else {
                throw new Error("Product not found");
            }
        } catch (error) {
            throw new Error("Error deleting product: " + error);
        }
    }
    

}