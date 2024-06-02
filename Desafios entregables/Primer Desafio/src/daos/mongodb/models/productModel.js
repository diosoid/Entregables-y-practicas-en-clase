import { Schema, model } from "mongoose";   
const productCollectionName = "product"

const productSchema = new Schema({
    title: {
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
    category: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    thumbnails: {
        type: Array
    }
});

export const ProductsModel = model(productCollectionName, productSchema)