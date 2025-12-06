import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import mongoose from "mongoose";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await UserService.createUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User Created Successfully",
        data: user

    })
})

const updateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const status = req.body?.status;

    const updatedUser = await UserService.updateUserStatus(userId, status);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated Successfully",
        data: updatedUser

    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUser(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        data: users

    })
})
const addToWishlist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;
    const result = await UserService.addToWishlist(new mongoose.Types.ObjectId(id), user.userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Add to wishlist successfully",
        data: result

    })
})
const removeFromWishlist = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;
    const result = await UserService.removeFromWishlist(new mongoose.Types.ObjectId(id), user.userId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Product removed from wishlist",
        data: result

    })
})

export const UserController = {
    createUser,
    updateUserStatus,
    getAllUsers,
    addToWishlist,
    removeFromWishlist
}