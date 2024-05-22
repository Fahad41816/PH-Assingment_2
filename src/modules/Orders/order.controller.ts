import { Request, Response } from 'express'
import { ProductModel } from '../Products/Products.model'
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
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error,
    })
  }
}

// get all orders
const ShowAllorders = async (req: Request, res: Response) => {
    try {
      const email: any = req.query.email;
  
      const result = await OrderService.GetAllOrders(email);
      
  
      if (email) {
        if (result && result.length > 0) {
          res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
          });
        } else {
          res.status(404).json({
            success: false,
            message: `No orders found for user email: ${email}`,
            data: [],
          });
        }
      } else {
        if (result && result.length > 0) {
          res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'No orders found',
            data: [],
          });
        }
      }
    } catch (error: unknown) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error
      });
    }
  };
export const OrderController = {
  CreateNewOrder,
  ShowAllorders,
}
