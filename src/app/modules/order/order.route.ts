import express from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { OrderController } from "./order.controller";
import { createOrderZodSchema, updateOrderStatusZodSchema } from "./order.validation";

const router = express.Router();


router.post("/",
    checkAuth(...Object.values(Role)),
    validateRequest(createOrderZodSchema),
    OrderController.createOrder
);


router.get("/",
    checkAuth(Role.ADMIN, Role.ADMIN),
    OrderController.getAllOrders
);

// // api/v1/envVars/my-envVarss
// router.get("/my-envVarss",
//     checkAuth(...Object.values(Role)),
//     OrderController.getUserenvVarss
// );

// // api/v1/envVars/envVarsId
// router.get("/:envVarsId",
//     checkAuth(...Object.values(Role)),
//     OrderController.getSingleenvVars
// );

// api/v1/envVars/envVarsId/status
router.patch("/:envVarsId/status",
    checkAuth(...Object.values(Role)),
    validateRequest(updateOrderStatusZodSchema),
    OrderController.updateOrderStatus
);

export const OrderRoutes = router;