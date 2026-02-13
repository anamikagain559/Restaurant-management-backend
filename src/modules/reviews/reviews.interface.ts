import { Document, Types } from "mongoose";

export interface IReview extends Document {
    reviewer: Types.ObjectId;
    menuItem: Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}
