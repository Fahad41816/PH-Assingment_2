"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    email: { type: 'string', required: true },
    productId: { type: 'string', required: true },
    price: { type: 'number', required: true },
    quantity: { type: 'number', required: true },
});
exports.OrderModel = (0, mongoose_1.model)('Order', OrderSchema);
