import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProductService } from "./product.service";

const addProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await ProductService.addProduct(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product created successfully!",
        data: product,
    })
})
const getAllProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await ProductService.getAllProduct(req.query as Record<string, string>)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Products retrieve successfully!",
        data: result
    })
})
const getSingleProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await ProductService.getSingleProduct(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product retrieved successfully",
        data: product,
    })
})
const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedProduct = await ProductService.updateProduct(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product updated Successfully!",
        data: updatedProduct,
    })
})
const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Product deleted successfully!",
        data: null,
    })
})



export const ProductController = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getSingleProduct
}