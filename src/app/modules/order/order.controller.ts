import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;
    console.log(req.body);

    const Order = await OrderService.createOrder(req.body, decodedToken.userId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Order created successfully",
        data: Order,
    });
});




export const OrderController = {
    createOrder
}