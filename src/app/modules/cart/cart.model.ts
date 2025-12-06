import mongoose from "mongoose";
import { ICart, ICartItem } from "./cart.interface";

const cartItemSchema = new mongoose.Schema<ICartItem>(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    { _id: false, versionKey: false }
);

const cartSchema = new mongoose.Schema<ICart>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        items: [cartItemSchema],
    },
    { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);

