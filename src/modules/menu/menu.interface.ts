import { Document } from "mongoose";

export enum MenuCategory {
    APPETIZERS = "Appetizers",
    MAIN_COURSE = "Main Course",
    DESSERTS = "Desserts",
    BEVERAGES = "Beverages",
}

export interface IMenu extends Document {
    name: string;
    description?: string;
    price: number;
    category: MenuCategory;
    image?: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
