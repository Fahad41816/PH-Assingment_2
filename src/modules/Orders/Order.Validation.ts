import { z } from "zod";

const orderDataValidation  = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email type Must Be string'
    }).email(),
    productId: z.string({
        required_error: 'productId is required',
        invalid_type_error: 'productId type Must Be string'
    }),
    price: z.number({
        required_error: 'price is required',
        invalid_type_error: 'price type Must Be number'
    }),
    quantity: z.number({
        required_error: 'quantity is required',
        invalid_type_error: 'quantity type Must Be number'
    }),
})

export default orderDataValidation