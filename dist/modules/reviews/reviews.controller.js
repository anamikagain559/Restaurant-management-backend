"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const reviews_service_1 = require("./reviews.service");
const menu_model_1 = require("../menu/menu.model");
const reviews_model_1 = require("./reviews.model");
const createReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const { menuItem, rating, comment } = req.body;
    if (!menuItem) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Menu item ID is required");
    }
    // Check if menu item exists
    const item = await menu_model_1.Menu.findById(menuItem);
    if (!item) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Menu item not found");
    }
    // Prevent duplicate review
    const alreadyReviewed = await reviews_model_1.Review.findOne({
        menuItem,
        reviewer: userId,
    });
    if (alreadyReviewed) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You have already reviewed this menu item");
    }
    const result = await reviews_service_1.ReviewServices.createReview({
        reviewer: userId,
        menuItem,
        rating,
        comment,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Review created successfully",
        data: result,
    });
});
const getReviewsByMenuItem = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { menuItemId } = req.params;
    if (!menuItemId) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Menu item ID is required");
    }
    const result = await reviews_service_1.ReviewServices.getReviewsByMenuItem(menuItemId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Reviews retrieved successfully",
        data: result,
    });
});
const updateReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const result = await reviews_service_1.ReviewServices.updateReview(id, userId, req.body);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Review not found or you are not authorized to update it");
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Review updated successfully",
        data: result,
    });
});
const deleteReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const result = await reviews_service_1.ReviewServices.deleteReview(id, userId);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Review not found or you are not authorized to delete it");
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Review deleted successfully",
        data: null,
    });
});
exports.ReviewControllers = {
    createReview,
    getReviewsByMenuItem,
    updateReview,
    deleteReview,
};
