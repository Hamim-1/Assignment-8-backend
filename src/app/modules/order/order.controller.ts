import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const decodedToken = req.user as JwtPayload;

    const Order = await OrderService.createOrder(req.body, decodedToken.userId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Order created successfully",
        data: Order,
    });
});

const getOrderHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const Order = await OrderService.getOrderHistory(id);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Orders retrived successfully",
        data: Order,
    });
});
const geCancelledtOrders = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const Order = await OrderService.geCancelledtOrders(id);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Orders retrived successfully",
        data: Order,
    });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const Order = await OrderService.getAllOrders();
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Orders retrived successfully",
        data: Order,
    });
});




export const OrderController = {
    createOrder,
    getOrderHistory,
    getAllOrders,
    geCancelledtOrders
}