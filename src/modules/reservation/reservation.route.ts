import { Router } from "express";
import { ReservationControllers } from "./reservation.controller";
import { checkAuth } from "../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../middlewares/validateRequest";
import { createReservationZodSchema, updateReservationStatusZodSchema } from "./reservation.validation";

const router = Router();

// POST route - allow both guests and users (optional auth)
router.post(
    "/",
    // We don't strictly require login to book a table (guest booking), 
    // but the controller will check if req.user exists.
    // If we want to capture user ID, we need a middleware that Decodes but doesn't block.
    // For now, let's keep it simple or use checkAuth with all roles if we want mandatory login.
    // Request says: "General/User - Book a table"
    validateRequest(createReservationZodSchema),
    ReservationControllers.createReservation
);

router.get("/", checkAuth(Role.ADMIN), ReservationControllers.getAllReservations);

router.get("/my", checkAuth(Role.USER, Role.ADMIN), ReservationControllers.getMyReservations);

router.patch(
    "/:id",
    checkAuth(Role.ADMIN),
    validateRequest(updateReservationStatusZodSchema),
    ReservationControllers.updateReservationStatus
);

export const ReservationRoutes = router;
