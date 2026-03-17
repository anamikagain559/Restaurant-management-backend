"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const mongoose_1 = require("mongoose");
const reservation_interface_1 = require("./reservation.interface");
const reservationSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(reservation_interface_1.ReservationStatus),
        default: reservation_interface_1.ReservationStatus.PENDING,
    },
    specialRequests: { type: String },
}, { timestamps: true, versionKey: false });
exports.Reservation = (0, mongoose_1.model)("Reservation", reservationSchema);
