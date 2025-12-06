import { Types } from "mongoose";
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}
export enum Status {
    BLOCKED = "BLOCKED",
    ACTIVE = "ACTIVE",
}

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: Role;
    status: Status;
    wishlist: Types.ObjectId[];
}

