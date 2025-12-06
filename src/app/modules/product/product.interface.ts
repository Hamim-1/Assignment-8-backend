import { Types } from "mongoose";

export interface IProduct {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    price: number;
    discount?: number;
    image: string;
    quantity: number;
    category: string;
    createdBy: Types.ObjectId;
}
