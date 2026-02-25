import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TableServices } from "./table.service";
import AppError from "../../errorHelpers/AppError";

const createTable = catchAsync(async (req: Request, res: Response) => {
    const result = await TableServices.createTable(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Table created successfully",
        data: result,
    });
});

const getAllTables = catchAsync(async (req: Request, res: Response) => {
    const result = await TableServices.getAllTables();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Tables fetched successfully",
        data: result,
    });
});

const updateTable = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TableServices.updateTable(id, req.body);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Table not found");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Table updated successfully",
        data: result,
    });
});

const deleteTable = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TableServices.deleteTable(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Table not found");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Table deleted successfully",
        data: null,
    });
});

export const TableControllers = {
    createTable,
    getAllTables,
    updateTable,
    deleteTable,
};
