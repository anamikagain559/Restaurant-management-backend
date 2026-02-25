import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReservationServices } from "./reservation.service";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";

const createReservation = catchAsync(async (req: Request, res: Response) => {
    const reservationData = req.body;

    // Auto-associate user if logged in
    const userId = (req.user as any)?.userId;
    if (userId) {
        reservationData.user = userId;
    }

    // Check if date is in the future
    const reservationDate = new Date(reservationData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reservationDate < today) {
        throw new AppError(httpStatus.BAD_REQUEST, "Reservation date must be in the future");
    }

    // Check for existing reservation (conflict check)
    const existing = await ReservationServices.checkExistingReservation(
        reservationData.email,
        reservationData.date,
        reservationData.time
    );

    if (existing) {
        throw new AppError(
            httpStatus.CONFLICT,
            "You already have a reservation for this date and time"
        );
    }

    const result = await ReservationServices.createReservation(reservationData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Table booked successfully",
        data: result,
    });
});

const getAllReservations = catchAsync(async (req: Request, res: Response) => {
    const result = await ReservationServices.getAllReservations();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All reservations retrieved successfully",
        data: result,
    });
});

const getMyReservations = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as any).userId;
    const result = await ReservationServices.getMyReservations(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Personal reservations retrieved successfully",
        data: result,
    });
});

const updateReservationStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await ReservationServices.updateReservationStatus(id, status);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Reservation not found");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reservation status updated successfully",
        data: result,
    });
});

export const ReservationControllers = {
    createReservation,
    getAllReservations,
    getMyReservations,
    updateReservationStatus,
};
