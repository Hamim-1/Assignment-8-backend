import { z } from "zod";

export const addToCartSchema = z.object({
    productId: z.string()
});

export const updateCartQuantitySchema = z.object({
    action: z.enum(["increment", "decrement"]),
});
