import { IReview } from "./reviews.interface";
import { Review } from "./reviews.model";

const createReview = async (payload: Partial<IReview>) => {
    const result = await Review.create(payload);
    return result;
};

const getReviewsByMenuItem = async (menuItemId: string) => {
    const result = await Review.find({ menuItem: menuItemId })
        .populate("reviewer", "name email")
        .sort({ createdAt: -1 });
    return result;
};

const updateReview = async (id: string, userId: string, payload: Partial<IReview>) => {
    const result = await Review.findOneAndUpdate(
        { _id: id, reviewer: userId },
        payload,
        { new: true, runValidators: true }
    );
    return result;
};

const deleteReview = async (id: string, userId: string) => {
    const result = await Review.findOneAndDelete({
        _id: id,
        reviewer: userId,
    });
    return result;
};

export const ReviewServices = {
    createReview,
    getReviewsByMenuItem,
    updateReview,
    deleteReview,
};
