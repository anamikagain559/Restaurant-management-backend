"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_interface_1 = require("./order.interface");
const orderItemSchema = new mongoose_1.Schema({
    menuItem: { type: mongoose_1.Schema.Types.ObjectId, ref: "Menu", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { _id: false });
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    email: { type: String },
    customerName: { type: String },
    phone: { type: String },
    address: { type: String },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    tableNumber: { type: Number },
    status: {
        type: String,
        enum: Object.values(order_interface_1.OrderStatus),
        default: order_interface_1.OrderStatus.NEW,
    },
    paymentStatus: {
        type: String,
        enum: Object.values(order_interface_1.PaymentStatus),
        default: order_interface_1.PaymentStatus.PENDING,
    },
}, { timestamps: true, versionKey: false });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
