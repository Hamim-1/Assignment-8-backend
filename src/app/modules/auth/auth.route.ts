import { Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/me", checkAuth(Role.USER, Role.ADMIN), authController.getMe);

router.post("/login", authController.credentialsLogin);

router.post("/refresh-token", authController.getNewAccessToken);

router.post("/logout", authController.logout);

export const AuthRoutes = router;