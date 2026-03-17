"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const table_service_1 = require("./table.service");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const createTable = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await table_service_1.TableServices.createTable(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Table created successfully",
        data: result,
    });
});
const getAllTables = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await table_service_1.TableServices.getAllTables();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Tables fetched successfully",
        data: result,
    });
});
const updateTable = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await table_service_1.TableServices.updateTable(id, req.body);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Table not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Table updated successfully",
        data: result,
    });
});
const deleteTable = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await table_service_1.TableServices.deleteTable(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Table not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Table deleted successfully",
        data: null,
    });
});
exports.TableControllers = {
    createTable,
    getAllTables,
    updateTable,
    deleteTable,
};
