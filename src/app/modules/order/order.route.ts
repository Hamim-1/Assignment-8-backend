import express from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { OrderController } from "./order.controller";
import { createOrderZodSchema } from "./order.validation";

const router = express.Router();


router.post("/",
    checkAuth(...Object.values(Role)),
    validateRequest(createOrderZodSchema),
    OrderController.createOrder
);
router.get("/",
    checkAuth(Role.ADMIN),
    OrderController.getAllOrders
);
router.get("/history",
    checkAuth(Role.USER),
    OrderController.getOrderHistory
);



export const OrderRoutes = router;