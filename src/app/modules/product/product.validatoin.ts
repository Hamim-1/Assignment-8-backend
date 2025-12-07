import { z } from "zod";


export const addProductSchema = z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().min(10, "Description is required"),
    price: z.number().positive("Price must be positive"),
    discount: z.number().optional(),
    quantity: z.number().int().nonnegative("Quantity cannot be negative"),
    category: z.string().min(2, "Category is required"),
});


export const updateProductSchema = addProductSchema.partial();
