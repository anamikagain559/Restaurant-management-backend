import { Router } from "express";
import { OrderControllers } from "./order.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/", checkAuth(Role.USER, Role.ADMIN), OrderControllers.createOrder);
router.get("/", checkAuth(Role.ADMIN), OrderControllers.getAllOrders);
router.get("/my", checkAuth(Role.USER, Role.ADMIN), OrderControllers.getMyOrders);
router.patch("/:id", checkAuth(Role.ADMIN), OrderControllers.updateOrderStatus);

export const OrderRoutes = router;
