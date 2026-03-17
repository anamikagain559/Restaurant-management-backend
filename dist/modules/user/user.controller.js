"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const user_interface_1 = require("./user.interface"); // updated interface
// Create new user
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = await user_service_1.UserServices.createUser(req.body);
    console.log('Received body:', req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User Created Successfully",
        data: user,
    });
});
// Update user by admin
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.params.id;
    if (!userId)
        throw new Error("User ID is required");
    const verifiedToken = req.user;
    const payload = req.body;
    const user = await user_service_1.UserServices.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User Updated Successfully",
        data: user,
    });
});
// Get all users
const getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_service_1.UserServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta,
    });
});
// Get logged-in user profile
const getMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const decodedToken = req.user;
    const result = await user_service_1.UserServices.getMe(decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Your profile Retrieved Successfully",
        data: result.data,
    });
});
// Block or unblock user (Admin only)
const blockOrUnblockUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    if (!isActive || !Object.values(user_interface_1.IsActive).includes(isActive)) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_codes_1.default.BAD_REQUEST,
            message: "Valid isActive value is required (ACTIVE or INACTIVE)",
            data: null,
        });
    }
    const updatedUser = await user_model_1.User.findByIdAndUpdate(id, { isActive }, { new: true }).lean();
    if (!updatedUser) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_codes_1.default.NOT_FOUND,
            message: "User not found",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: `User status updated to ${isActive}`,
        data: updatedUser,
    });
});
// Update own profile
const updateMyProfile = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const result = await user_service_1.UserServices.updateMyProfile(user.userId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
// Get user by ID
const getUserById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_codes_1.default.BAD_REQUEST,
            message: "Invalid or missing User ID",
            data: null,
        });
    }
    const user = await user_model_1.User.findById(id).lean();
    if (!user) {
        return (0, sendResponse_1.sendResponse)(res, {
            success: false,
            statusCode: http_status_codes_1.default.NOT_FOUND,
            message: "User not found",
            data: null,
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User retrieved successfully",
        data: { ...user, id: user._id.toString() },
    });
});
exports.UserControllers = {
    createUser,
    updateUser,
    getAllUsers,
    getMe,
    getUserById,
    updateMyProfile,
    blockOrUnblockUser,
};
