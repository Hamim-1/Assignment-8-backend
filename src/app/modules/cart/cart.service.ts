import { Cart } from './cart.model';
import { Types } from 'mongoose';
import AppError from '../../errorHelpers/AppError';
import { Product } from '../product/product.model';

const getCart = async (userId: Types.ObjectId) => {
    const cart = await Cart.findOne({ user: userId }).populate({
        path: "items.product",
        select: "title price dprice image quantity",
    });

    if (!cart) {
        return null;
    }

    return cart;
};
const addToCart = async (productId: Types.ObjectId, userId: Types.ObjectId) => {
    let cart = await Cart.findOne({ user: userId });


    if (cart) {
        if (cart.items.some(item => item.product.equals(productId))) {
            throw new AppError(400, "This product is already in cart");
        }

        cart.items.push({ product: productId, quantity: 1 });
        await cart.save();
        return cart;
    }

    cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
    });

    return cart;

}
const updateQuantity = async (productId: Types.ObjectId, userId: Types.ObjectId, action: string) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new AppError(404, "Cart not found");

    const item = cart.items.find(i => i.product.equals(productId));
    if (!item) {
        throw new AppError(404, "Product not in cart");
    }

    const product = await Product.findById(productId);
    if (!product) throw new AppError(404, "Product not found");

    if (action === "increment" && item.quantity <= product.quantity) {
        item.quantity += 1;

    }

    if (action === "decrement" && item.quantity > 1) {
        item.quantity -= 1;
    }

    await cart.save();
    return cart;

}
const removeItem = async (productId: Types.ObjectId, userId: Types.ObjectId) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new AppError(400, "Cart no found")
    }
    cart.items = cart.items.filter(item => !item.product.equals(productId));

    await cart.save();
    return cart;

}


export const CartService = {
    getCart,
    addToCart,
    updateQuantity,
    removeItem
}