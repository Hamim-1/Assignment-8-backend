import { Router } from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { createReviewZodSchema, updateReviewZodSchema } from './review.validation';
import { ReviewController } from './review.controller';
const router = Router();

router.post("/", checkAuth(Role.USER), validateRequest(createReviewZodSchema), ReviewController.createReview);

router.get("/:id", ReviewController.getReview);

router.patch("/:id", checkAuth(Role.USER), validateRequest(updateReviewZodSchema), ReviewController.updateReview);

export const ReviewRotues = router;