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



export const OrderRoutes = router;