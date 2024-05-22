import { Request, Response } from 'express'
import { ProductModel } from '../Products/Products.model'
import { OrderModel } from './order.model'
import { OrderService } from './order_service'
import orderDataValidation from './Order.Validation'

const CreateNewOrder = async (req: Request, res: Response) => {
  try {
    const OrderData = req.body
    const IsProducExist = await ProductModel.findOne({
      _id: OrderData.productId,
    })

    if (IsProducExist) {
      if (IsProducExist?.inventory?.quantity >= OrderData.quantity) {

        const ValidationCheckData = orderDataValidation.parse(OrderData)

        const result = await OrderService.CreateOrder(ValidationCheckData)

        await ProductModel.findByIdAndUpdate(
          IsProducExist._id,
          { $inc: { 'inventory.quantity': - OrderData.quantity } },
        )

        if (IsProducExist.inventory.quantity - OrderData.quantity === 0) {
          // If product quantity becomes zero, set IsDelete flag to true
          await ProductModel.findByIdAndUpdate(IsProducExist._id, {
            'inventory.inStock': false,
          })
        } 

        res.status(200).json({
          success: true,
          message: 'Order Create Successfully!',
          data: result,
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Insufficient quantity available in inventory!',
        })
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'Product is not Found',
        data: null,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error,
    })
  }
}

// get all orders
const ShowAllorders = async (req: Request, res: Response) => {
  try {
    const email: any = req.query.email

    const result = await OrderService.GetAllOrders(email)

    res.status(200).json({
      success: true,
      message: 'All Orders',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order not found', 
    })
  }
}

export const OrderController = {
  CreateNewOrder,
  ShowAllorders,
}
