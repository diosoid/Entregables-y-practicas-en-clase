import { Schema, model } from "mongoose";

export const cartSchema = new Schema ({
    products:[
        {
            _id: false,
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: Schema.Types.ObjectId,
                ref: "product"
            }
        }
    ]
})

export const CartsModel = model("carts", cartSchema)