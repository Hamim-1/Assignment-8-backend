import { Request, Response } from "express";
import { envVArs } from "../../config/env";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";
import { SSLService } from "../sslCommerz/sslCommerz.service";


const successPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await PaymentService.successPayment(query as Record<string, string>);

    if (result.success) {
        res.redirect(envVArs.SSL.SSL_SUCCESS_FRONTEND_URL);
    }

});
const failPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await PaymentService.failPayment(query as Record<string, string>);

    if (!result.success) {
        res.redirect(envVArs.SSL.SSL_FAIL_FRONTEND_URL);
    }
});
const cancelPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;

    const result = await PaymentService.cancelPayment(query as Record<string, string>);

    if (!result.success) {
        res.redirect(envVArs.SSL.SSL_CANCEL_FRONTEND_URL);
    }
});
const validatePayment = catchAsync(async (req: Request, res: Response) => {

    await SSLService.validatePayment(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment Validated Successfully",
        data: null
    })
});

export const PaymentController = {
    successPayment,
    failPayment,
    cancelPayment,
    validatePayment
};