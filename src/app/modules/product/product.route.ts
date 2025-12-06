import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ProductController } from "./product.controller";

const router = Router();

router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getSingleProduct);

router.post("/", checkAuth(Role.ADMIN), ProductController.addProduct);
router.patch("/:id", checkAuth(Role.ADMIN), ProductController.updateProduct);
router.delete("/:id", checkAuth(Role.ADMIN), ProductController.deleteProduct);

export const ProductRoutes = router;