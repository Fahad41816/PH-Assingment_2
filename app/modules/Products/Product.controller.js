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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_service_1 = require("./Product_service");
const Product_Validation_1 = __importDefault(require("./Product.Validation"));
// create new product
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProductData = req.body;
        const ZodValidateData = Product_Validation_1.default.parse(ProductData);
        const Result = yield Product_service_1.ProductService.CreateProductInDb(ZodValidateData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: Result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            messsage: error,
        });
    }
});
// show all product
const ShowAllProductData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        console.log(searchTerm);
        const Result = yield Product_service_1.ProductService.GetAllProduct(searchTerm);
        console.log(Result);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: Result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            messsage: error.message,
        });
    }
});
// get single product
const ShowSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        console.log(productId);
        const Result = yield Product_service_1.ProductService.GetSingleProduct(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: Result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            messsage: error.message,
        });
    }
});
// update product data
const UpdateProductData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const ProductData = req.body;
        const UpdateProductValidation = Product_Validation_1.default.parse(ProductData);
        const Result = yield Product_service_1.ProductService.updateProduct(productId, UpdateProductValidation);
        res.status(200).json({
            success: true,
            message: 'Product Update Successfully',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            messsage: error,
        });
    }
});
// delete prouct data
const DeleteProductData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        console.log(productId);
        const result = yield Product_service_1.ProductService.DeleteProduct(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            messsage: error.message,
        });
    }
});
exports.ProductController = {
    CreateProduct,
    ShowAllProductData,
    ShowSingleProduct,
    UpdateProductData,
    DeleteProductData,
};
