import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { CartController } from "./cart.controller";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/", checkAuth(Role.USER), CartController.getCart);

router.post("/", checkAuth(Role.USER), CartController.addToCart);

router.patch("/:id", checkAuth(Role.USER), CartController.updateQuantity);

router.delete("/:id", checkAuth(Role.USER), CartController.removeItem);


export const CartRoutes = router;