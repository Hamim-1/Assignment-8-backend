
import { ORDER_STATUS } from "../order/order.interface";
import { Order } from "../order/order.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";


const initPayment = async () => {


};
const successPayment = async (query: Record<string, string>) => {
    const session = await Order.startSession();
    session.startTransaction();
    try {
        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId },
            {
                status: PAYMENT_STATUS.PAID
            }, { session })

        await Order.findByIdAndUpdate(updatedPayment?.order, {
            status: ORDER_STATUS.COMPLETE
        }, { session });



        await session.commitTransaction();
        session.endSession();

        return {
            success: true, message: "Payment Completed Successfully!"
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }

};
const failPayment = async (query: Record<string, string>) => {
    const session = await Order.startSession();
    session.startTransaction();
    console.log("fail");

    try {
        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId },
            {
                status: PAYMENT_STATUS.FAILED
            }, { session })

        await Order.findByIdAndUpdate(updatedPayment?.order, {
            status: ORDER_STATUS.FAILED
        }, { session });



        await session.commitTransaction();
        session.endSession();
        console.log("failed5");

        return {
            success: false, message: "Payment Failed!"
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }

};
const cancelPayment = async (query: Record<string, string>) => {
    const session = await Order.startSession();
    session.startTransaction();
    try {
        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId },
            {
                status: PAYMENT_STATUS.CANCELLED
            }, { session })

        await Order.findByIdAndUpdate(updatedPayment?.order, {
            status: ORDER_STATUS.CANCEL
        }, { session });



        await session.commitTransaction();
        session.endSession();
        console.log(query.transactionId);

        return {
            success: false, message: "Payment Cancelled!"
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


export const PaymentService = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
};