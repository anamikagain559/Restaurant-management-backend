"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const reviews_route_1 = require("../modules/reviews/reviews.route");
const payment_route_1 = require("../modules/payments/payment.route");
const otp_route_1 = require("../modules/otp/otp.route");
const menu_route_1 = require("../modules/menu/menu.route");
const reservation_route_1 = require("../modules/reservation/reservation.route");
const order_route_1 = require("../modules/order/order.route");
const table_route_1 = require("../modules/table/table.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/menu",
        route: menu_route_1.MenuRoutes
    },
    {
        path: "/reservations",
        route: reservation_route_1.ReservationRoutes
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes
    },
    {
        path: "/tables",
        route: table_route_1.TableRoutes
    },
    {
        path: "/otp",
        route: otp_route_1.OtpRoutes
    },
    {
        path: "/payments",
        route: payment_route_1.paymentsRoutes
    },
    {
        path: "/reviews",
        route: reviews_route_1.reviewsRoutes
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)
