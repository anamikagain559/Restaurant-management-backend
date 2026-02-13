import { model, Schema } from "mongoose";
import { IReservation, ReservationStatus } from "./reservation.interface";

const reservationSchema = new Schema<IReservation>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        guests: { type: Number, required: true },
        status: {
            type: String,
            enum: Object.values(ReservationStatus),
            default: ReservationStatus.PENDING,
        },
        specialRequests: { type: String },
    },
    { timestamps: true, versionKey: false }
);

export const Reservation = model<IReservation>("Reservation", reservationSchema);
