"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
const ProductSchema = new mongoose_1.Schema({
    name: { type: 'string', required: [true, 'Name is Require'] },
    description: { type: 'string', required: [true, 'description is Require'] },
    price: { type: 'number', required: [true, 'price is Require'] },
    category: { type: 'string', required: [true, 'category is Require'] },
    inventory: {
        quantity: { type: "Number", required: true },
        inStock: { type: "Boolean", required: true }
    },
    tags: { type: ['String'], required: true },
    variants: { type: [variantSchema], required: true },
});
exports.ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
