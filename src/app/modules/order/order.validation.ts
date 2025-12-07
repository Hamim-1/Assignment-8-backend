import { z } from "zod";
import { ORDER_STATUS } from "./order.interface";


export const createOrderZodSchema = z.object({
    products: z.array(z.string()),

});

export const updateOrderStatusZodSchema = z.object({
    status: z.enum(Object.values(ORDER_STATUS) as [string]),
});