import { Router } from "express";
import { ReservationControllers } from "./reservation.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/", ReservationControllers.createReservation);
router.get("/", checkAuth(Role.ADMIN), ReservationControllers.getAllReservations);
router.get("/my", checkAuth(Role.USER, Role.ADMIN), ReservationControllers.getMyReservations);
router.patch("/:id", checkAuth(Role.ADMIN), ReservationControllers.updateReservationStatus);

export const ReservationRoutes = router;
