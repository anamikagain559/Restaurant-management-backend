"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewZodSchema = exports.createReviewZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createReviewZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        menuItem: zod_1.default.string({ message: "Menu item ID is required" }),
        rating: zod_1.default.number({ message: "Rating is required" }).min(1).max(5),
        comment: zod_1.default.string().optional(),
    }),
});
exports.updateReviewZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        rating: zod_1.default.number().min(1).max(5).optional(),
        comment: zod_1.default.string().optional(),
    }),
});
