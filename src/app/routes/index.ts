import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { OrderRoutes } from "../modules/order/order.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { ReviewRotues } from "../modules/review/review.route";

export const router = Router();
const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/products",
        route: ProductRoutes
    },
    {
        path: "/carts",
        route: CartRoutes
    },
    {
        path: "/order",
        route: OrderRoutes
    },
    {
        path: "/payment",
        route: PaymentRoutes
    },
    {
        path: "/reviews",
        route: ReviewRotues
    },
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
})