import { ProductModel } from "../Products/Products.model"
import { Torder } from "./order.interface"
import { OrderModel } from "./order.model"

// create order 
const CreateOrder = async(OrderData: Torder) => { 
    const result = await OrderModel.create(OrderData)
    return result 
}

// gett all orders 
const GetAllOrders = async(email: string) => { 
  
    if(email){  // Case-insensitive regex 
        const Result = await OrderModel.find({
          "$or": [
            { "email": { $regex: email } }, 
          ]
        }); 
        return Result
      }else{
        const Result = await ProductModel.find()
        return Result
      }
}

export const OrderService = {
    CreateOrder,
    GetAllOrders    
}