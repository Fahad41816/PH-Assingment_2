"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const Product_controller_1 = require("./Product.controller");
const router = express_1.default.Router();
// add product 
router.post('/', Product_controller_1.ProductController.CreateProduct);
// get all product 
router.get('/', Product_controller_1.ProductController.ShowAllProductData);
// get single product 
router.get('/:productId', Product_controller_1.ProductController.ShowSingleProduct);
// update product information 
router.put('/:productId', Product_controller_1.ProductController.UpdateProductData);
// Delete PRoduct 
router.delete('/:productId', Product_controller_1.ProductController.DeleteProductData);
exports.ProductRouter = router;
