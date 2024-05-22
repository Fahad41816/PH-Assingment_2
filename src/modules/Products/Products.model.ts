import { model, Schema } from "mongoose";
import { TProduct, TvariantType } from "./Product.interface";

const variantSchema = new Schema<TvariantType>({
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
});

const ProductSchema = new Schema<TProduct>({
    name: {type: 'string', required: [true, 'Name is Require']},
    description: {type: 'string', required: [true, 'description is Require']},
    price: {type: 'number', required: [true, 'price is Require']},
    category: {type: 'string', required: [true, 'category is Require']},
    inventory: {
        quantity: {type: "Number", required: true},
        inStock: {type: "Boolean", required: true}
    },
    tags: {type: ['String'], required: true}, 
    variants: {type: [variantSchema], required: true},
})

export const ProductModel = model<TProduct>('Product' , ProductSchema)