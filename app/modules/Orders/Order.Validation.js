"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderDataValidation = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email type Must Be string'
    }).email(),
    productId: zod_1.z.string({
        required_error: 'productId is required',
        invalid_type_error: 'productId type Must Be string'
    }),
    price: zod_1.z.number({
        required_error: 'price is required',
        invalid_type_error: 'price type Must Be number'
    }),
    quantity: zod_1.z.number({
        required_error: 'quantity is required',
        invalid_type_error: 'quantity type Must Be number'
    }),
});
exports.default = orderDataValidation;
