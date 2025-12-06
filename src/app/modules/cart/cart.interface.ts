import { Types } from "mongoose";

export interface ICartItem {
    product: Types.ObjectId;
    quantity: number;
}

export interface ICart {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    items: ICartItem[];
}
