import Express  from "express";
import { OrderController } from "./order.controller";

const router = Express.Router()

// get all orders 
router.get('/', OrderController.ShowAllorders)

// create orders 
router.post('/', OrderController.CreateNewOrder)

export const OrderRouter = router