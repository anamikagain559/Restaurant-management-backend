import { Document, Types } from "mongoose";

export enum OrderStatus {
    NEW = "new",
    PREPARING = "preparing",
    READY = "ready",
    SERVED = "served",
    COMPLETED = "completed",
}

export enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
}

export interface IOrderItem {
    menuItem: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    user?: Types.ObjectId;
    email?: string;
    customerName?: string;
    phone?: string;
    address?: string;
    items: IOrderItem[];
    totalAmount: number;
    tableNumber?: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}
