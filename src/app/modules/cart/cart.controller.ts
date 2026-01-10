import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { CartService } from "./cart.service";
import { sendResponse } from "../../utils/sendResponse";
import mongoose, { Types } from "mongoose";

const getCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const cart = await CartService.getCart(user.userId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Cart retrieved successfully",
        data: cart,
    })

})
const addToCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;
    const cart = await CartService.addToCart(new mongoose.Types.ObjectId(id), user.userId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Cart Add successfully",
        data: cart,
    })

})
const updateQuantity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;
    const { action } = req.body;

    const cart = await CartService.updateQuantity(new mongoose.Types.ObjectId(id), user.userId, action);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Cart quantity updated successfully",
        data: cart,
    })

})
const removeItem = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;

    const cart = await CartService.removeItem(new mongoose.Types.ObjectId(id), user.userId);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product removed from Cart successfully",
        data: cart,
    })

})


export const CartController = {
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
}