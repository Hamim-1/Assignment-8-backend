import { model, Schema } from "mongoose";
import { IOrder, ORDER_STATUS } from "./order.interface";

const orderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: "Product",
        required: true,
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    }
}, {
    timestamps: true
});

export const Order = model("order", orderSchema);