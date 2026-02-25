import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { UserRoutes } from "../modules/user/user.route"

import { reviewsRoutes } from "../modules/reviews/reviews.route"
import { paymentsRoutes } from "../modules/payments/payment.route";
import { OtpRoutes } from "../modules/otp/otp.route"
import { MenuRoutes } from "../modules/menu/menu.route"
import { ReservationRoutes } from "../modules/reservation/reservation.route"
import { OrderRoutes } from "../modules/order/order.route"
import { TableRoutes } from "../modules/table/table.route"
export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/menu",
        route: MenuRoutes
    },
    {
        path: "/reservations",
        route: ReservationRoutes
    },
    {
        path: "/orders",
        route: OrderRoutes
    },
    {
        path: "/tables",
        route: TableRoutes
    },
    {
        path: "/otp",
        route: OtpRoutes
    },

    {
        path: "/payments",
        route: paymentsRoutes
    },
    {
        path: "/reviews",
        route: reviewsRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

// router.use("/user", UserRoutes)
// router.use("/tour", TourRoutes)
// router.use("/division", DivisionRoutes)
// router.use("/booking", BookingRoutes)
// router.use("/user", UserRoutes)