"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const order_service_1 = require("./order.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createOrder = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const orderData = req.body;
    // Auto-associate user if logged in
    const user = req.user;
    const userId = user?.userId || user?._id || user?.id;
    if (userId) {
        orderData.user = userId;
    }
    // Ensure email is set from token if not already present
    if (!orderData.email && user?.email) {
        orderData.email = user.email;
    }
    const result = await order_service_1.OrderServices.createOrder(orderData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Order placed successfully",
        data: result,
    });
});
const getAllOrders = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await order_service_1.OrderServices.getAllOrders();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "All orders retrieved successfully",
        data: result,
    });
});
const getMyOrders = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const userId = user?.userId || user?._id || user?.id;
    const email = user?.email;
    const result = await order_service_1.OrderServices.getMyOrders(userId, email);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Order history retrieved successfully",
        data: result,
    });
});
const updateOrderStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await order_service_1.OrderServices.updateOrderStatus(id, status);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Order status updated successfully",
        data: result,
    });
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus,
};
