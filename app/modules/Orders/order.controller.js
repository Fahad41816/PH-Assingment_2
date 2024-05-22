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
exports.OrderController = void 0;
const Products_model_1 = require("../Products/Products.model");
const order_service_1 = require("./order_service");
const Order_Validation_1 = __importDefault(require("./Order.Validation"));
const CreateNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const OrderData = req.body;
        const IsProducExist = yield Products_model_1.ProductModel.findOne({
            _id: OrderData.productId,
        });
        if (IsProducExist) {
            if (((_a = IsProducExist === null || IsProducExist === void 0 ? void 0 : IsProducExist.inventory) === null || _a === void 0 ? void 0 : _a.quantity) >= OrderData.quantity) {
                const ValidationCheckData = Order_Validation_1.default.parse(OrderData);
                const result = yield order_service_1.OrderService.CreateOrder(ValidationCheckData);
                yield Products_model_1.ProductModel.findByIdAndUpdate(IsProducExist._id, { $inc: { 'inventory.quantity': -OrderData.quantity } });
                if (IsProducExist.inventory.quantity - OrderData.quantity === 0) {
                    // If product quantity becomes zero, set IsDelete flag to true
                    yield Products_model_1.ProductModel.findByIdAndUpdate(IsProducExist._id, {
                        'inventory.inStock': false,
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Order Create Successfully!',
                    data: result,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Insufficient quantity available in inventory!',
                });
            }
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Product is not Found',
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
// get all orders
const ShowAllorders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.OrderService.GetAllOrders(email);
        res.status(200).json({
            success: true,
            message: 'All Orders',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order not found',
            data: null,
        });
    }
});
exports.OrderController = {
    CreateNewOrder,
    ShowAllorders,
};
