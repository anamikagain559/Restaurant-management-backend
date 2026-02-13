import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import { ReviewServices } from "./reviews.service";
import { Menu } from "../menu/menu.model";
import { Review } from "./reviews.model";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { menuItem, rating, comment } = req.body;

  if (!menuItem) {
    throw new AppError(httpStatus.BAD_REQUEST, "Menu item ID is required");
  }

  // Check if menu item exists
  const item = await Menu.findById(menuItem);
  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Menu item not found");
  }

  // Prevent duplicate review
  const alreadyReviewed = await Review.findOne({
    menuItem,
    reviewer: userId,
  });

  if (alreadyReviewed) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already reviewed this menu item"
    );
  }

  const result = await ReviewServices.createReview({
    reviewer: userId,
    menuItem,
    rating,
    comment,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

const getReviewsByMenuItem = catchAsync(async (req: Request, res: Response) => {
  const { menuItemId } = req.params;

  if (!menuItemId) {
    throw new AppError(httpStatus.BAD_REQUEST, "Menu item ID is required");
  }

  const result = await ReviewServices.getReviewsByMenuItem(menuItemId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { id } = req.params;

  const result = await ReviewServices.updateReview(id, userId, req.body);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Review not found or you are not authorized to update it"
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review updated successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { id } = req.params;

  const result = await ReviewServices.deleteReview(id, userId);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Review not found or you are not authorized to delete it"
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review deleted successfully",
    data: null,
  });
});

export const ReviewControllers = {
  createReview,
  getReviewsByMenuItem,
  updateReview,
  deleteReview,
};
