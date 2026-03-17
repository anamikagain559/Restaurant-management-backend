"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationServices = void 0;
const reservation_model_1 = require("./reservation.model");
const checkExistingReservation = async (email, date, time) => {
    const existing = await reservation_model_1.Reservation.findOne({
        email,
        date: new Date(date),
        time,
        status: { $ne: "cancelled" },
    });
    return existing;
};
const createReservation = async (payload) => {
    const result = await reservation_model_1.Reservation.create(payload);
    return result;
};
const getAllReservations = async () => {
    const result = await reservation_model_1.Reservation.find().populate("user");
    return result;
};
const getMyReservations = async (userId, email) => {
    const result = await reservation_model_1.Reservation.find({
        $or: [{ user: userId }, { email: email }],
    });
    return result;
};
const updateReservationStatus = async (id, status) => {
    const result = await reservation_model_1.Reservation.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    return result;
};
exports.ReservationServices = {
    createReservation,
    getAllReservations,
    getMyReservations,
    updateReservationStatus,
    checkExistingReservation,
};
