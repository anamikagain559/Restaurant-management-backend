import mongoose from "mongoose";
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { User } from "./user.model";
import { IsActive } from "./user.interface"; // updated interface

// Create new user
const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUser(req.body);
  console.log('Received body:', req.body); 
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    });
});

// Update user by admin
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) throw new Error("User ID is required");

    const verifiedToken = req.user as JwtPayload;
    const payload = req.body;

    const user = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Updated Successfully",
        data: user,
    });
});

// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta,
    });
});

// Get logged-in user profile
const getMe = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserServices.getMe(decodedToken.userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your profile Retrieved Successfully",
        data: result.data,
    });
});

// Block or unblock user (Admin only)
const blockOrUnblockUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!isActive || !Object.values(IsActive).includes(isActive)) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: "Valid isActive value is required (ACTIVE or INACTIVE)",
            data: null,
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
    ).lean();

    if (!updatedUser) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found",
            data: null,
        });
    }

    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `User status updated to ${isActive}`,
        data: updatedUser,
    });
});

// Update own profile
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;
    const payload = req.body;

    const result = await UserServices.updateMyProfile(user.userId, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});

// Get user by ID
const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.BAD_REQUEST,
            message: "Invalid or missing User ID",
            data: null,
        });
    }

    const user = await User.findById(id).lean();

    if (!user) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "User not found",
            data: null,
        });
    }

    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User retrieved successfully",
        data: { ...user, id: user._id.toString() },
    });
});

export const UserControllers = {
    createUser,
    updateUser,
    getAllUsers,
    getMe,
    getUserById,
    updateMyProfile,
    blockOrUnblockUser,
};
