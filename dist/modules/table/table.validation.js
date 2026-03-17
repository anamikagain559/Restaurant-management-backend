"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTableZodSchema = exports.createTableZodSchema = void 0;
const zod_1 = require("zod");
exports.createTableZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        tableNumber: zod_1.z.number().min(1, "Table number is required"),
        capacity: zod_1.z.number().min(1, "Capacity is required"),
        status: zod_1.z.enum(["Available", "Occupied", "Reserved"]).optional(),
    }),
});
exports.updateTableZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        tableNumber: zod_1.z.number().optional(),
        capacity: zod_1.z.number().optional(),
        status: zod_1.z.enum(["Available", "Occupied", "Reserved"]).optional(),
    }),
});
