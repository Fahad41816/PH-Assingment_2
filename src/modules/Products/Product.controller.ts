import { Request, Response } from 'express'
import { ProductService } from './Product_service'
import { z } from 'zod'
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messsage: error,
    })
  }
}

// show all product
const ShowAllProductData = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query
    console.log(searchTerm)

    const Result = await ProductService.GetAllProduct(searchTerm)
    console.log(Result)
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: Result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messsage: error.message,
    })
  }
}

// get single product
const ShowSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    console.log(productId)
    const Result = await ProductService.GetSingleProduct(productId)

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: Result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messsage: error.message,
    })
  }
}

// update product data
const UpdateProductData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const ProductData = req.body
    
    const UpdateProductValidation = ProductDataValidation.parse(ProductData)

    const Result = await ProductService.updateProduct(productId, UpdateProductValidation)

    res.status(200).json({
      success: true,
      message: 'Product Update Successfully',
      data: null,
    })
  } catch (error: any) {
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
