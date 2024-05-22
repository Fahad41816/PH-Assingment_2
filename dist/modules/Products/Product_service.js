"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Products_model_1 = require("./Products.model");
// create product
const CreateProductInDb = (ProductData) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Products_model_1.ProductModel.create(ProductData);
    return Result;
});
// get all product
const GetAllProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    if (searchTerm) { // Case-insensitive regex
        const regexValue = new RegExp(searchTerm, 'i');
        const Result = yield Products_model_1.ProductModel.find({
            "$or": [
                { "name": { $regex: regexValue } },
                { "description": { $regex: regexValue } }
            ]
        });
        return Result;
    }
    else {
        const Result = yield Products_model_1.ProductModel.find();
        return Result;
    }
});
// get single product
const GetSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Products_model_1.ProductModel.findOne({ _id: id });
    return result;
});
// update product data
const updateProduct = (UpdateProductId, UpdateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Products_model_1.ProductModel.updateOne({ _id: UpdateProductId }, { $set: UpdateData });
    return result;
});
// delete the product 
const DeleteProduct = (ProductId) => __awaiter(void 0, void 0, void 0, function* () {
    const Result = yield Products_model_1.ProductModel.deleteOne({ _id: ProductId });
    return Result;
});
exports.ProductService = {
    CreateProductInDb,
    GetAllProduct,
    GetSingleProduct,
    updateProduct,
    DeleteProduct
};
