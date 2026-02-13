import { model, Schema } from "mongoose";
import { IOrder, OrderStatus, PaymentStatus } from "./order.interface";

const orderItemSchema = new Schema(
    {
        menuItem: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    { _id: false }
);

const orderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        items: [orderItemSchema],
        totalAmount: { type: Number, required: true },
        tableNumber: { type: Number },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.NEW,
        },
        paymentStatus: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
        },
    },
    { timestamps: true, versionKey: false }
);

export const Order = model<IOrder>("Order", orderSchema);
