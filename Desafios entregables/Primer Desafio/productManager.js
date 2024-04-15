class ProductManager {   
    constructor () {
        this.products = [];
    } 

    addProduct (title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock){
            return console.log('Todos los campos son obligatorios')
        }

        const checkCode = this.products.find((e) => e.code === code);
        if (checkCode) {
        return  console.log ("El articulo ya fue ingresado, por favor ingrese un producto diferente");
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
        
        

    }     

    #getMaxid(){
        let maxId = 0;
        this.products.map((product) => { 
        if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }
        
    getProduct () {
        return this.products;   
    }

    getProductByid (id) {
        if (id) {
            return this.products.find(product => product.id === id);                   
        }
        return console.log("Product not found")
    };
}

const productManager = new ProductManager()

productManager.addProduct('Sprite', 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",1 ,30 )
productManager.addProduct('Fanta', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 )
productManager.addProduct('Fanta', 'Edicion Loolapaloza', 3400, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg",2 , 50 ) // CODIGO REPETIDO
productManager.addProduct( 'Sin Azucar', 3000, "https://coca-colaentucasa.com/wp-content/uploads/2023/06/2891-COCA-COLA-ZERO-PET-500-ml-PACK-x6-2.jpg", 3, 20 ) //CAMPO INCOMPLETO

// Productos en el arreglo
console.log('Los productos en el carrito son:')
console.log(productManager.getProduct());

// Busqueda por ID
console.log('El producto buscado es:')
console.log(productManager.getProductByid(2));
console.log(productManager.getProductByid(6));



