"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReservationStatusZodSchema = exports.createReservationZodSchema = void 0;
const zod_1 = require("zod");
exports.createReservationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email"),
        phone: zod_1.z.string().min(1, "Phone number is required"),
        date: zod_1.z.string().min(1, "Date is required"),
        time: zod_1.z.string().min(1, "Time is required"),
        guests: zod_1.z.number().min(1, "At least 1 guest required"),
        specialRequests: zod_1.z.string().optional(),
    }),
});
exports.updateReservationStatusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "confirmed", "cancelled", "completed"]),
    }),
});
