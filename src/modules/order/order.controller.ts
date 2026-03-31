import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrderServices } from "./order.service";
import httpStatus from "http-status-codes";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const orderData = req.body;

    // Auto-associate user if logged in
    const userId = (req.user as any)?.userId;
    if (userId) {
        orderData.user = userId;
    }

    const result = await OrderServices.createOrder(orderData);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Order placed successfully",
        data: result,
    });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderServices.getAllOrders();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All orders retrieved successfully",
        data: result,
    });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
    const { userId, email } = req.user as any;

    const result = await OrderServices.getMyOrders(userId, email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order history retrieved successfully",
        data: result,
    });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await OrderServices.updateOrderStatus(id, status);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order status updated successfully",
        data: result,
    });
});

export const OrderControllers = {
    createOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus,
};
