"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const reviews_model_1 = require("./reviews.model");
const createReview = async (payload) => {
    const result = await reviews_model_1.Review.create(payload);
    return result;
};
const getReviewsByMenuItem = async (menuItemId) => {
    const result = await reviews_model_1.Review.find({ menuItem: menuItemId })
        .populate("reviewer", "name email")
        .sort({ createdAt: -1 });
    return result;
};
const updateReview = async (id, userId, payload) => {
    const result = await reviews_model_1.Review.findOneAndUpdate({ _id: id, reviewer: userId }, payload, { new: true, runValidators: true });
    return result;
};
const deleteReview = async (id, userId) => {
    const result = await reviews_model_1.Review.findOneAndDelete({
        _id: id,
        reviewer: userId,
    });
    return result;
};
exports.ReviewServices = {
    createReview,
    getReviewsByMenuItem,
    updateReview,
    deleteReview,
};
