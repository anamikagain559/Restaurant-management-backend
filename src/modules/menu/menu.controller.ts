import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { MenuServices } from "./menu.service";
import httpStatus from "http-status-codes";

const createMenu = catchAsync(async (req: Request, res: Response) => {
    const result = await MenuServices.createMenu(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Menu item created successfully",
        data: result,
    });
});

const getAllMenus = catchAsync(async (req: Request, res: Response) => {
    const result = await MenuServices.getAllMenus();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Menu items retrieved successfully",
        data: result,
    });
});

const getMenuById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MenuServices.getMenuById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Menu item retrieved successfully",
        data: result,
    });
});

const updateMenu = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MenuServices.updateMenu(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Menu item updated successfully",
        data: result,
    });
});

const deleteMenu = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MenuServices.deleteMenu(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Menu item deleted successfully",
        data: result,
    });
});

export const MenuControllers = {
    createMenu,
    getAllMenus,
    getMenuById,
    updateMenu,
    deleteMenu,
};
