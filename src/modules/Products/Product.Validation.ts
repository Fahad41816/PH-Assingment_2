import { z } from "zod";

const inventorySchema = z.object({
    quantity: z.number({ required_error: 'Quantity is required' }).nonnegative({ message: 'Quantity must be non-negative' }),
    inStock: z.boolean({ required_error: 'InStock is required' })
  });

const ProductDataValidation = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).max(20),
    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description must be a string",
    }),
    price: z.number({
        required_error: "price is required",
        invalid_type_error: "price must be a number",
    }),
    category: z.string({
        required_error: "category is required",
        invalid_type_error: "category must be a number",
    }),
    inventory: inventorySchema,
    tags: z.array(z.string()).min(1, {message: 'At least one tag is required'}),
    variants: z.array(z.object({
        type: z.string(),
        value: z.string()
    }))
})

export default ProductDataValidation;