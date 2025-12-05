import { Router } from "express";

export const router = Router();
const moduleRoutes = [
    {
        path: "/users",
        route: router
    },
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
})