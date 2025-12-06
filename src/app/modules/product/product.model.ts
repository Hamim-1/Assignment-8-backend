import mongoose from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new mongoose.Schema<IProduct>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        category: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

