import Express, { Request, Response, Router } from 'express'
import { ProductController } from './Product.controller'
const router = Express.Router()


// add product 
router.post('/', ProductController.CreateProduct)
 
// get all product 
router.get('/', ProductController.ShowAllProductData)

// get single product 
router.get('/:productId', ProductController.ShowSingleProduct)

// update product information 
router.put('/:productId', ProductController.UpdateProductData)

// Delete PRoduct 
router.delete('/:productId', ProductController.DeleteProductData)
 

 
export const ProductRouter = router