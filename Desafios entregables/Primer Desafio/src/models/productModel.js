import { Schema, model } from "mongoose";   
const productCollectionName = "product"

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    
});

export const ProductsModel = model (
    productCollectionName,
    productSchema,
    
)