import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (payload: IOrder) => {
    const result = await Order.create(payload);
    return result;
};

const getAllOrders = async () => {
    const result = await Order.find().populate("user").populate("items.menuItem");
    return result;
};

const getMyOrders = async (userId: string) => {
    const result = await Order.find({ user: userId }).populate("items.menuItem");
    return result;
};

const updateOrderStatus = async (id: string, status: string) => {
    const result = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );
    return result;
};

export const OrderServices = {
    createOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus,
};
