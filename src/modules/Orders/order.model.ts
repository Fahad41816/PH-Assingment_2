import { model, Schema } from "mongoose";
import { Torder } from "./order.interface";

 
const OrderSchema = new Schema<Torder>({
    email: {type:'string', required: true},
    productId:{type:'string', required: true} ,
    price: {type:'number', required: true},
    quantity: {type:'number', required:true},
})


export const OrderModel = model<Torder>('Order', OrderSchema)