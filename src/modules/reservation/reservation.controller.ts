import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReservationServices } from "./reservation.service";
import httpStatus from "http-status-codes";

const createReservation = catchAsync(async (req: Request, res: Response) => {
    const result = await ReservationServices.createReservation(req.body);
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
    const userId = (req.user as any).userId; // Assuming checkAuth adds user to req
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
