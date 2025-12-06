import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";

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
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
})