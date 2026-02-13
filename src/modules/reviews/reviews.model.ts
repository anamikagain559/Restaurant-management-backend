import { Schema, model, Types } from "mongoose";
import { IReview } from "./reviews.interface";

const reviewSchema = new Schema<IReview>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

reviewSchema.index(
  { reviewer: 1, menuItem: 1 },
  { unique: true }
);

export const Review = model<IReview>("Review", reviewSchema);
