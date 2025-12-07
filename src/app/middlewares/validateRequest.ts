import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest = (zodSchema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.body?.data === "string") {
            try {
                const parsedJson = JSON.parse(req.body.data);

                req.body = {
                    ...req.body,
                    ...parsedJson,
                };
            } catch (err) {
                return next(new Error("Invalid JSON in 'data' field"));
            }
        }

        req.body = await zodSchema.parseAsync(req.body);

        next();
    } catch (error) {
        next(error)
    }
}