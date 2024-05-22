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
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
// create order 
const CreateOrder = (OrderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.create(OrderData);
    return result;
});
// gett all orders 
const GetAllOrders = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) { // Case-insensitive regex 
        const Result = yield order_model_1.OrderModel.find({
            "$or": [
                { "email": { $regex: email } },
            ]
        });
        return Result;
    }
    else {
        const Result = yield order_model_1.OrderModel.find();
        return Result;
    }
});
exports.OrderService = {
    CreateOrder,
    GetAllOrders
};
