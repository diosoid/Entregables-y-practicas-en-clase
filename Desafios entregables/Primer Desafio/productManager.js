
const fs = require('fs');


class ProductManager {   
    constructor (path) {
        this.path = path;
        //this.products = [];
    } 

    async getProducts () {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(products)
            } else return []
            
        } catch (error) {
            console.log(error)          
        }
        // return this.products;   // Codigo anterior...
    }
    

    async addProduct (prod) {
        try {
            const products = await this.getProducts()
            products.push(prod)
            await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf8');

            // if (!title || !description || !price || !thumbnail || !code || !stock){
            //     return console.log('Todos los campos son obligatorios')
            // }
            // const checkCode = this.products.find((e) => e.code === code);
            // if (checkCode) {
            // return  console.log ("El articulo ya fue ingresado, por favor ingrese un producto diferente");
            // }
            // const product = {
            //     id: this.#getMaxid() + 1 ,
            //     title,
            //     description,
            //     price,
            //     thumbnail,
            //     code,
            //     stock
            // }
            // this.products.push(product);       
            
        } catch (error) {
            console.log(error)
            
        }
        
    }     

    // METODOS ANTERIORES

    // #getMaxid(){
    //     let maxId = 0;
    //     this.products.map((product) => { 
    //     if (product.id > maxId) maxId = product.id;
    //     });
    //     return maxId;
    // }
        

    
    // getProductByid (id) {

    //     const  getProdByID = this.products.find((e) => e.id === id);

    //     if (getProdByID) {
    //         return getProdByID;
    //     }
    //     return  console.log ("Product not found");
       
    // };
}

const productManager = new ProductManager('./products.json');

const prod1 = {
    title: 'Sprite',
    description: 'Original',
    price: 2800,
    thumbnail:"https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",
    code:1,
    stock:30
}

const prod2 = {
    title: 'Fanta',
    description: 'Edicion Loolapaloza',
    price: 3400,
    thumbnail:"https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",
    code:2,
    stock:50
}

const test = async() => {
    console.log(await productManager.getProducts())
    await productManager.addProduct(prod1)
    await productManager.addProduct(prod2)
    console.log(await productManager.getProducts())
}

test()





// PRUBAS DEL MODELO ANTERIOR //
// productManager.addProduct('Sprite', 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 )
// productManager.addProduct('Fanta', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 )
// productManager.addProduct('Fanta', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 ) // CODIGO REPETIDO
// productManager.addProduct( 'Sin Azucar', 3000, "https://coca-colaentucasa.com/wp-content/uploads/2023/06/2891-COCA-COLA-ZERO-PET-500-ml-PACK-x6-2.jpg", 3, 20 ) //CAMPO INCOMPLETO

// // Productos en el arreglo
// console.log('Los productos en el carrito son:')
// console.log(productManager.getProduct());

// // Busqueda por ID
// console.log('El producto buscado es:')
// console.log(productManager.getProductByid(2));

// Busqueda por ID fallida
//productManager.getProductByid(6)



