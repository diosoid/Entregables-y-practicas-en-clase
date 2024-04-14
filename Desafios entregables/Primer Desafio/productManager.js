class ProductManager {   
    constructor () {
        this.products = [];
    } 

    addProduct (title, description, price, thumbnail, stock) {

        const product = {
            code: this.#getMaxcode() + 1 ,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product);
    };    

    #getMaxcode(){
        let maxCode = 0;
        this.products.map((product) => { 
        if (product.code > maxCode) maxCode = product.code;
        });
        return maxCode;
    }
        
    getProduct () {
        return this.products;   
    }

    getProductByCode () {
        return this.products.find(product => product.code === code);        
    };
}

const productManager = new ProductManager()

productManager.addProduct('Coca Cola', 'Sin Azucar', 3000, "https://coca-colaentucasa.com/wp-content/uploads/2023/06/2891-COCA-COLA-ZERO-PET-500-ml-PACK-x6-2.jpg", 20 )
productManager.addProduct('Sprite', 'Original', 2800, "https://coca-colaentucasa.com/wp-content/uploads/2024/02/3193-CCZ-473X6-CREATIONS-KWAVE.jpg", 30 )

console.log(productManager.getProduct());


