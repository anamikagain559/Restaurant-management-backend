import { z } from "zod";

export const createTableZodSchema = z.object({
    body: z.object({
        tableNumber: z.number().min(1, "Table number is required"),
        capacity: z.number().min(1, "Capacity is required"),
        status: z.enum(["Available", "Occupied", "Reserved"]).optional(),
    }),
});

export const updateTableZodSchema = z.object({
    body: z.object({
        tableNumber: z.number().optional(),
        capacity: z.number().optional(),
        status: z.enum(["Available", "Occupied", "Reserved"]).optional(),
    }),
});
