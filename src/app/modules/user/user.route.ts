import { Request, Response, Router } from "express";
import { validateRequest } from './../../middlewares/validateRequest';
import { createUserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);

router.get("/", checkAuth(Role.ADMIN), UserController.getAllUsers);
router.get("/wishlist", checkAuth(Role.USER), UserController.getWishlist);

router.patch("/:id/status", checkAuth(Role.ADMIN), UserController.updateUserStatus);

router.post("/wishlist/:id", checkAuth(Role.USER), UserController.addToWishlist);

router.delete("/wishlist/:id", checkAuth(Role.USER), UserController.removeFromWishlist);



export const userRoutes = router;