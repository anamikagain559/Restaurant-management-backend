"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const createOrder = async (payload) => {
    const result = await order_model_1.Order.create(payload);
    return result;
};
const getAllOrders = async () => {
    const result = await order_model_1.Order.find().populate("user").populate("items.menuItem");
    return result;
};
const getMyOrders = async (userId, email) => {
    const query = {};
    const orConditions = [];
    if (userId)
        orConditions.push({ user: userId });
    if (email)
        orConditions.push({ email: email });
    if (orConditions.length > 0) {
        query.$or = orConditions;
    }
    else {
        // If no identifying info, return nothing
        return [];
    }
    const result = await order_model_1.Order.find(query).populate("items.menuItem");
    return result;
};
const updateOrderStatus = async (id, status) => {
    const result = await order_model_1.Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    return result;
};
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus,
};
