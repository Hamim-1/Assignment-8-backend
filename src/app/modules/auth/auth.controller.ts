import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVArs } from "../../config/env";
import { User } from "../user/user.model";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body);

    res.cookie("accessToken", loginInfo.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    })
    res.cookie("refreshToken", loginInfo.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged in successfully",
        data: loginInfo,
    })

})

const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(400, "No Refresh Token Recive from Cookie")
    }
    const tokenInfo = await AuthService.getNewAccessToken(refreshToken);
    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    })
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "New access token retrived successfully",
        data: tokenInfo,
    })
})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User logged out successfully",
        data: null,
    })
})


const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user.userId;
    const user = await User.findById(id).select("-password");
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User is Authorized",
        data: user,
    })
})

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user.userId;
    const user = await AuthService.changePassword(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Password updated Successfully!",
        data: user,
    })
})



export const authController = {
    credentialsLogin, getNewAccessToken, logout, getMe, changePassword
}