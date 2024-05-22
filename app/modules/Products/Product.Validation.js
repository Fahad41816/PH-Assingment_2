"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }).nonnegative({ message: 'Quantity must be non-negative' }),
    inStock: zod_1.z.boolean({ required_error: 'InStock is required' })
});
const ProductDataValidation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).max(20),
    description: zod_1.z.string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
    }),
    price: zod_1.z.number({
        required_error: "price is required",
        invalid_type_error: "price must be a number",
    }),
    category: zod_1.z.string({
        required_error: "category is required",
        invalid_type_error: "category must be a number",
    }),
    inventory: inventorySchema,
    tags: zod_1.z.array(zod_1.z.string()).min(1, { message: 'At least one tag is required' }),
    variants: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string(),
        value: zod_1.z.string()
    }))
});
exports.default = ProductDataValidation;
