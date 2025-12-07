import AppError from "../../errorHelpers/AppError";
import { Product } from "../product/product.model";
import { IReview } from "./review.interface"
import { Review } from "./review.model"

const createReview = async (payload: IReview) => {
    const checkReview = await Review.findOne({ product: payload.product, user: payload.user });

    if (checkReview?.user) {
        throw new AppError(400, "You can only submit one review per product.")
    }
    const review = await Review.create(payload);
    return review;
}
const getReview = async (productId: string) => {
    const product = Product.find({ _id: productId });
    if (!product) {
        throw new AppError(404, "Product not found")
    }
    const reviews = await Review.find({ product: productId });
    return reviews;
}
const updateReview = async (payload: IReview, reviewId: string) => {
    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
        throw new AppError(404, "Review not found")
    }
    const updatedReview = await Review.findByIdAndUpdate(reviewId, payload, { new: true, runValidators: true });
    return updatedReview;
}


export const ReviewService = {
    createReview,
    getReview,
    updateReview
}