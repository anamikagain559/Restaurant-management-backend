"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const reservation_service_1 = require("./reservation.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const createReservation = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const reservationData = req.body;
    // Auto-associate user if logged in
    const userId = req.user?.userId;
    if (userId) {
        reservationData.user = userId;
    }
    // Check if date is in the future
    const reservationDate = new Date(reservationData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (reservationDate < today) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Reservation date must be in the future");
    }
    // Check for existing reservation (conflict check)
    const existing = await reservation_service_1.ReservationServices.checkExistingReservation(reservationData.email, reservationData.date, reservationData.time);
    if (existing) {
        throw new AppError_1.default(http_status_codes_1.default.CONFLICT, "You already have a reservation for this date and time");
    }
    const result = await reservation_service_1.ReservationServices.createReservation(reservationData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Table booked successfully",
        data: result,
    });
});
const getAllReservations = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await reservation_service_1.ReservationServices.getAllReservations();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "All reservations retrieved successfully",
        data: result,
    });
});
const getMyReservations = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { userId, email } = req.user;
    const result = await reservation_service_1.ReservationServices.getMyReservations(userId, email);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Personal reservations retrieved successfully",
        data: result,
    });
});
const updateReservationStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await reservation_service_1.ReservationServices.updateReservationStatus(id, status);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Reservation not found");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Reservation status updated successfully",
        data: result,
    });
});
exports.ReservationControllers = {
    createReservation,
    getAllReservations,
    getMyReservations,
    updateReservationStatus,
};
