import { model, Schema } from "mongoose";
import { IMenu, MenuCategory } from "./menu.interface";

const menuSchema = new Schema<IMenu>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        category: {
            type: String,
            enum: Object.values(MenuCategory),
            required: true,
        },
        image: { type: String },
        isAvailable: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

export const Menu = model<IMenu>("Menu", menuSchema);
