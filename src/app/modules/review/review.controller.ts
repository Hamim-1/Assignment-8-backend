import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { ReviewService } from "./review.service"
import { IReview } from "./review.interface"

const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload: IReview = {
        ...req.body,
        user: req.user.userId
    }
    const review = await ReviewService.createReview(payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Review added successfully!",
        data: review

    })
})
const getReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const review = await ReviewService.getReview(productId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reviews retrieved successfully!",
        data: review

    })
})
const updateReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.id;
    const review = await ReviewService.updateReview(req.body, reviewId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Review updated successfully!",
        data: review

    })
})

export const ReviewController = {
    createReview,
    getReview,
    updateReview
}