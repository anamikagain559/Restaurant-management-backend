import { z } from "zod";

export const createReservationZodSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(1, "Phone number is required"),
        date: z.string().min(1, "Date is required"),
        time: z.string().min(1, "Time is required"),
        guests: z.number().min(1, "At least 1 guest required"),
        specialRequests: z.string().optional(),
    }),
});

export const updateReservationStatusZodSchema = z.object({
    body: z.object({
        status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
    }),
});
