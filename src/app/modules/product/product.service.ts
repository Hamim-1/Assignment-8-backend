import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { productSearchableFields } from "./product.constant";
import { IProduct } from "./product.interface"
import { Product } from "./product.model"

const addProduct = async (paylaod: IProduct) => {
    const product = await Product.create(paylaod);
    return product;
}

const getAllProduct = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Product.find(), query)

    const productData = queryBuilder
        .search(productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .build()

    const data = await productData;
    const meta = await queryBuilder.getMeta();

    return {
        data,
        meta
    }
}
const getSingleProduct = async (id: string) => {
    const product = Product.findOne({ _id: id });
    if (!product) {
        throw new AppError(404, "Product not found!");
    }
    return product;
}
const updateProduct = async (id: string, paylaod: Partial<IProduct>) => {
    const product = Product.findOne({ _id: id });
    if (!product) {
        throw new AppError(404, "Product not found!")
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, paylaod, {
        new: true, runValidators: true
    });
    return updatedProduct;
}
const deleteProduct = async (id: string) => {
    const product = Product.findOne({ _id: id });
    if (!product) {
        throw new AppError(404, "Product not found!")
    }
    await Product.findByIdAndDelete(id);
    return null;
}

export const ProductService = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getSingleProduct
}