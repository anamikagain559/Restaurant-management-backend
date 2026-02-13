import { Document, Types } from "mongoose";

export enum ReservationStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed",
}

export interface IReservation extends Document {
    user?: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    date: Date;
    time: string;
    guests: number;
    status: ReservationStatus;
    specialRequests?: string;
    createdAt: Date;
    updatedAt: Date;
}
