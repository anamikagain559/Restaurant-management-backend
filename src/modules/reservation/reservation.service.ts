import { IReservation } from "./reservation.interface";
import { Reservation } from "./reservation.model";

const createReservation = async (payload: IReservation) => {
    const result = await Reservation.create(payload);
    return result;
};

const getAllReservations = async () => {
    const result = await Reservation.find().populate("user");
    return result;
};

const getMyReservations = async (userId: string) => {
    const result = await Reservation.find({ user: userId });
    return result;
};

const updateReservationStatus = async (id: string, status: string) => {
    const result = await Reservation.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );
    return result;
};

export const ReservationServices = {
    createReservation,
    getAllReservations,
    getMyReservations,
    updateReservationStatus,
};
