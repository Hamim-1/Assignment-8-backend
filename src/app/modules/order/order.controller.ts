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

const getUserOrders = catchAsync(
    async (req: Request, res: Response) => {
        const Orders = await OrderService.getUserOrders();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Orders retrieved successfully",
            data: Orders,
        });
    }
);
const getSingleOrder = catchAsync(
    async (req: Request, res: Response) => {
        const Order = await OrderService.getOrderById();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order retrieved successfully",
            data: Order,
        });
    }
);

const getAllOrders = catchAsync(
    async (req: Request, res: Response) => {
        const Orders = await OrderService.getAllOrders();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Orders retrieved successfully",
            data: {},
            // meta: {},
        });
    }
);

const updateOrderStatus = catchAsync(
    async (req: Request, res: Response) => {

        const updated = await OrderService.updateOrderStatus(
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order Status Updated Successfully",
            data: updated,
        });
    }
);


export const OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    getUserOrders,
    updateOrderStatus,
}