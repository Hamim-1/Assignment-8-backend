import { NextFunction, Request, Response } from "express"

import AppError from "../errorHelpers/AppError"
import { envVArs } from "../config/env"
import { deleteImageFromCLoudinary } from "../config/cloudinary.config"

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500
    let message = "Something Went Wrong!!";

    if (req.file) {
        console.log(req.file.path);

        await deleteImageFromCLoudinary(req.file?.path)
    }

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVArs.NODE_ENV === "development" ? err.stack : null
    })
}