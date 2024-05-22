import { TProduct } from './Product.interface'
import { ProductModel } from './Products.model'

// create product
const CreateProductInDb = async (ProductData: TProduct) => {
  const Result = await ProductModel.create(ProductData)
  return Result
}

// get all product
const GetAllProduct = async (searchTerm: any) => {
   
  if(searchTerm){  // Case-insensitive regex
    const regexValue = new RegExp(searchTerm, 'i')
    const Result = await ProductModel.find({
      "$or": [
        { "name": { $regex: regexValue } },
        { "description": { $regex: regexValue } }
      ]
    }); 
    return Result
  }else{
    const Result = await ProductModel.find()
    return Result
  }

}

// get single product
const GetSingleProduct = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id })
  return result
}

// update product data
const updateProduct = async (UpdateProductId: string, UpdateData: TProduct) => {
  const result = await ProductModel.updateOne(
    { _id: UpdateProductId },
    { $set: UpdateData },
  )

  return result
}

// delete the product 
const DeleteProduct = async(ProductId: string) => {

    const Result =await ProductModel.deleteOne({_id: ProductId})
    return Result
}

export const ProductService = {
  CreateProductInDb,
  GetAllProduct,
  GetSingleProduct,
  updateProduct,
  DeleteProduct
}
