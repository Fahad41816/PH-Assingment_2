import { Request, Response } from 'express'
import { ProductService } from './Product_service'
import ProductDataValidation from './Product.Validation'
// create new product
const CreateProduct = async (req: Request, res: Response) => {
  try {
    const ProductData = req.body

    const ZodValidateData = ProductDataValidation.parse(ProductData)

    const Result = await ProductService.CreateProductInDb(ZodValidateData)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: Result,
    })
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      messsage: error,
    })
  }
}

// show all product
const ShowAllProductData = async (req: Request, res: Response) => {
  try {
    const  searchTerm = req.query.searchTerm
     
    const Result = await ProductService.GetAllProduct(searchTerm)
     

    if(searchTerm){
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: Result,
        }) 
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: Result,
    })
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      messsage: error,
    })
  }
}

// get single product
const ShowSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    
    const Result = await ProductService.GetSingleProduct(productId)

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: Result,
    })
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      messsage: error,
    })
  }
}

// update product data
const UpdateProductData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const ProductData = req.body
    
    const UpdateProductValidation = ProductDataValidation.parse(ProductData)

     await ProductService.updateProduct(productId, UpdateProductValidation)

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: null,
    })
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      messsage: error,
    })
  }
}

// delete prouct data
const DeleteProductData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    console.log(productId)
    const result = await ProductService.DeleteProduct(productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messsage: error.message,
    })
  }
}

export const ProductController = {
  CreateProduct,
  ShowAllProductData,
  ShowSingleProduct,
  UpdateProductData,
  DeleteProductData,
}
