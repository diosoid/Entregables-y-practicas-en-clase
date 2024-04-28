
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
            console.log(error)            
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
    const productToUpdate = await this.getProductByid(id);
    if (productToUpdate) {
        Object.assign(productToUpdate, updatedProperties);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4), 'utf8');
        return productToUpdate;
    }
    }
    // METODO ANTERIOR
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

    async deleteProduct (id) {
        const deleteProduct = await this.getProductByid(id)
        if (deleteProduct) {
            products = products.filter((e) => e.id!== id);
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf8');
            return deleteProduct;
        }
        return console.log("Product not found");
    }
}

//const productManager = new ProductManager('./products.json');

//Area DE pruebas Minimizada
// const test = async() => {
//     console.log(await productManager.getProducts())

//     await productManager.addProduct('Sprite', 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 )

//     await productManager.addProduct('Sprite', 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 ) //Codigo Duplicado

//     await productManager.addProduct( 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 ) //Campo sin completar

//     await productManager.addProduct('Fanta', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 )

//     await productManager.addProduct('Prity', 'Limon', 8500, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",13 , 1234 )

//     // await productManager.updateProduct(2, 'Roman Riquelme', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 )

//     await productManager.addProduct('Mirinda', 'Piña', 3400, "https://mirinda.com/wp-content/uploads/2024/02/mirinda-pineapple.jpg", 19, 200)

//     await productManager.addProduct('Schweppes', 'Naranja', 3700, "https://schweppes.com/wp-content/uploads/2024/02/schweppes-orange.jpg", 18, 210)

//     await productManager.addProduct('Mountain Dew', 'Code Red', 3600, "https://mountaindew.com/wp-content/uploads/2024/02/mountain-dew-code-red.jpg", 21, 220)

//     await productManager.addProduct('Canada Dry', 'Tonica Zero', 3800, "https://canadadry.com/wp-content/uploads/2024/02/canada-dry-tonic-zero.jpg", 20, 230)


//     await productManager.updateProduct(2, { title: "Martin Palermo", stock: 4 })

//     console.log (await productManager.deleteProduct(3))

//     console.log(await productManager.getProducts())

//     console.log(await productManager.getProductByid(2));
// }
// De momento la funcion test queda deshabilitada
//test()







