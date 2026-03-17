"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const menu_service_1 = require("./menu.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuServices.createMenu(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Menu item created successfully",
        data: result,
    });
});
const getAllMenus = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await menu_service_1.MenuServices.getAllMenus();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Menu items retrieved successfully",
        data: result,
    });
});
const getMenuById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await menu_service_1.MenuServices.getMenuById(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Menu item retrieved successfully",
        data: result,
    });
});
const updateMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await menu_service_1.MenuServices.updateMenu(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Menu item updated successfully",
        data: result,
    });
});
const deleteMenu = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await menu_service_1.MenuServices.deleteMenu(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Menu item deleted successfully",
        data: result,
    });
});
exports.MenuControllers = {
    createMenu,
    getAllMenus,
    getMenuById,
    updateMenu,
    deleteMenu,
};
