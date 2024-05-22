"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const Product_route_1 = require("./modules/Products/Product.route");
const order_route_1 = require("./modules/Orders/order.route");
// medelware 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routers 
app.use('/api/products', Product_route_1.ProductRouter);
app.use('/api/orders', order_route_1.OrderRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.all("*", (req, res) => {
    res.status(500).json({
        "success": false,
        "message": "Route not found"
    });
});
exports.default = app;
