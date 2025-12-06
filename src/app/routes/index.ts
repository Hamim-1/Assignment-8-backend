import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CartRoutes } from "../modules/cart/cart.route";

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
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
})