import { Types } from "mongoose";

export enum ORDER_STATUS {
    PENDING = "PENDING",
    COMPLETE = "COMPLETE",
    CANCEL = "CANCEL",
    FAILED = "FAILED",

}

export interface IOrder {
    user: Types.ObjectId;
    products: Types.ObjectId[];
    payment: Types.ObjectId;
    status: ORDER_STATUS
}