import express, { json, NextFunction, Request, Response } from 'express';
const app = express()
import cors from 'cors'
import { ProductRouter } from './modules/Products/Product.route';
import { OrderRouter } from './modules/Orders/order.route';
 
// medelware 
app.use(express.json());
app.use(cors());

// routers 
app.use('/api/products', ProductRouter)
app.use('/api/orders', OrderRouter)

app.get('/', (req : Request , res: Response) => {
  res.send('Hello World!')
})


app.all("*", (req : Request , res: Response)=>{
  res.status(500).json({
    "success": false,
    "message": "Route not found"
   })
})

export default app
