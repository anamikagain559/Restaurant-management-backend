"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationRoutes = void 0;
const express_1 = require("express");
const reservation_controller_1 = require("./reservation.controller");
const checkAuth_1 = require("../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../middlewares/validateRequest");
const reservation_validation_1 = require("./reservation.validation");
const router = (0, express_1.Router)();
// POST route - allow both guests and users (optional auth)
router.post("/", 
// We don't strictly require login to book a table (guest booking), 
// but the controller will check if req.user exists.
// If we want to capture user ID, we need a middleware that Decodes but doesn't block.
// For now, let's keep it simple or use checkAuth with all roles if we want mandatory login.
// Request says: "General/User - Book a table"
(0, validateRequest_1.validateRequest)(reservation_validation_1.createReservationZodSchema), reservation_controller_1.ReservationControllers.createReservation);
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), reservation_controller_1.ReservationControllers.getAllReservations);
router.get("/my", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.ADMIN), reservation_controller_1.ReservationControllers.getMyReservations);
router.patch("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.validateRequest)(reservation_validation_1.updateReservationStatusZodSchema), reservation_controller_1.ReservationControllers.updateReservationStatus);
exports.ReservationRoutes = router;
