
const fs = require('fs');


class ProductManager {   
    constructor (path) {
        this.path = path;
        this.products = [];
    } 

    async getProducts () {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf8');
                this.products = JSON.parse(products)
                return this.products
            } else return []
            
        } catch (error) {
            console.log(error)          
        }
        
    }
    

    async addProduct (title , description ,price ,thumbnail , code ,stock ) {
        try {
            await this.getProducts()
            const checkCode = await this.products.find((e) => e.code === code);
            if (checkCode) {
            return  console.log ("El articulo ya fue ingresado, por favor ingrese un producto diferente");
            }
            if (!title || !description || !price || !thumbnail || !code || !stock){
                return console.log('Todos los campos son obligatorios')
            }
            const product = {
                id: this.#getMaxid() + 1 ,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(product);       
            
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf8');

            
        } catch (error) {
            console.log(error)
            
        }
        
    }     

    // METODOS ANTERIORES

    #getMaxid(){
        let maxId = 0;
        this.products.map((product) => { 
        if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }
        

    
    async getProductByid (id) {

        const products = await fs.promises.readFile(this.path, 'utf8');
        this.products = JSON.parse(products)
        
        const  getProdByID = this.products.find((e) => e.id === id);
        
        if (getProdByID) {
            return getProdByID;
        }
        return  console.log ("Product not found");
        return this.products
       
    };

    async updateProduct (id, title, description, price, thumbnail, code, stock) {
        const updateProduct = await this.getProductByid(id)
        if (updateProduct) {
            updateProduct.title = title;
            updateProduct.description = description;
            updateProduct.price = price;
            updateProduct.thumbnail = thumbnail;
            updateProduct.code = code;
            updateProduct.stock = stock;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf8');
            return updateProduct;
         }
    }

    async deleteProduct (id) {
        const deleteProduct = await this.getProductByid(id)
        if (deleteProduct) {
            this.products = this.products.filter((e) => e.id!== id);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf8');
            return deleteProduct;
        }
        return console.log("Product not found");
    }
}

const productManager = new ProductManager('./products.json');

//Prueba basada en la clase

// const prod1 = {
//     title: 'Sprite',
//     description: 'Original',
//     price: 2800,
//     thumbnail:"https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",
//     code:1,
//     stock:30
// }

// const prod2 = {
//     title: 'Fanta',
//     description: 'Edicion Loolapaloza',
//     price: 3400,
//     thumbnail:"https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",
//     code:2,
//     stock:50
// }


//Area DE pruebas


const test = async() => {
    console.log(await productManager.getProducts())

    await productManager.addProduct('Sprite', 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 )

    await productManager.addProduct('Sprite', 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 ) //Codigo Duplicado

    await productManager.addProduct( 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 ) //Campo sin completar

    await productManager.addProduct('Fanta', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 )

    await productManager.addProduct('Prity', 'Limon', 8500, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",13 , 1234 )

    await productManager.updateProduct(2, 'Roman Riquelme', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 )

    console.log (await productManager.deleteProduct(3))


    console.log(await productManager.getProducts())

    console.log(await productManager.getProductByid(2));
}

test()





// PRUBAS DEL MODELO ANTERIOR //
// productManager.addProduct('Fanta', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 ) // CODIGO REPETIDO
// productManager.addProduct( 'Sin Azucar', 3000, "https://coca-colaentucasa.com/wp-content/uploads/2023/06/2891-COCA-COLA-ZERO-PET-500-ml-PACK-x6-2.jpg", 3, 20 ) //CAMPO INCOMPLETO

// // Productos en el arreglo
// console.log('Los productos en el carrito son:')
// console.log(productManager.getProduct());

// // Busqueda por ID
// console.log('El producto buscado es:')

// Busqueda por ID fallida
//productManager.getProductByid(6)



