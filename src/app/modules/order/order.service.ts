import AppError from "../../errorHelpers/AppError";
import { Cart } from "../cart/cart.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { User } from "../user/user.model";
import { IOrder, ORDER_STATUS } from "./order.interface";
import { Order } from "./order.model";

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}



const createOrder = async (payload: IOrder, userId: string) => {
    const session = await Order.startSession();
    session.startTransaction();
    try {
        const transactionId = getTransactionId();
        const user = await User.findById(userId);
        const cart = await Cart.findOne({ user: user?._id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            throw new AppError(400, "Cart is empty");
        }

        let totalAmount = 0;

        cart.items.forEach((item: any) => {
            if (item.product.discount > 0) {
                const discountPrice = (item.product.price / 100) * item.product.discount;

                const priceAfteDiscount = item.product.price - discountPrice;

                totalAmount += priceAfteDiscount * item.quantity;
            } else {

                totalAmount += item.product.price * item.quantity;
            }

        });

        const order = await Order.create([{
            ...payload,
            user: userId,
            status: ORDER_STATUS.PENDING
        }], { session })

        const payment = await Payment.create([{
            order: order[0]._id,
            status: PAYMENT_STATUS.UNPAID,
            transactionId,
            amount: totalAmount
        }], { session })

        const updatedOrder = await Order.findByIdAndUpdate(order[0]._id,
            { payment: payment[0]._id },
            { new: true, runValidators: true, session }
        )
            .populate("user", "name email phone adress")
            .populate("payment")

        const userAddress = (updatedOrder?.user as any).adress;
        const userName = (updatedOrder?.user as any).name;
        const userPhone = (updatedOrder?.user as any).phone;
        const userEmail = (updatedOrder?.user as any).email;
        const sslPayload: ISSLCommerz = {
            name: userName,
            email: userEmail,
            phoneNumber: userPhone,
            address: userAddress,
            amount: totalAmount,
            transactionId,
        }
        const sslPayment = await SSLService.sslPaymentInit(sslPayload)

        await session.commitTransaction();
        session.endSession();

        return {
            Order: updatedOrder,
            payment: sslPayment.GatewayPageURL
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }

};



export const OrderService = {
    createOrder
};