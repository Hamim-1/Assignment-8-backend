import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcrypt";
import { envVArs } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { Types } from "mongoose";
import { Product } from "../product/product.model";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new AppError(400, "User is already exits")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVArs.BCRYPT_SALT_ROUND));

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest
    });
    return user;
}

const updateUserStatus = async (userId: string, status: string) => {
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new AppError(404, "User not found");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, { status: status }, { new: true, runValidators: true });
    return updatedUser;
}

const getAllUser = async (query: any) => {
    const filter: Record<string, string> = { role: "USER" };

    if (query.status) {
        filter.status = query.status;
    }

    const users = await User.find(filter);

    return users;
}

const addToWishlist = async (productId: Types.ObjectId, userId: string) => {

    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user?.wishlist.some(id => id.equals(productId))) {
        throw new AppError(400, "This product is already in your Wishlist");
    }
    user?.wishlist.push(productId);
    user.save();
    return user;
}

const removeFromWishlist = async (productId: Types.ObjectId, userId: string) => {
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new AppError(404, "User not found")
    }


    user.wishlist = user.wishlist.filter(id => !id.equals(productId));
    await user.save();
    return user;
}

export const UserService = {
    createUser,
    updateUserStatus,
    getAllUser,
    addToWishlist,
    removeFromWishlist
}