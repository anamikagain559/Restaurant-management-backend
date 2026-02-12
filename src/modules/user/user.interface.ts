import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

// Auth providers
export interface IAuthProvider {
    provider: string;  // "Google", "Credential"
    providerId: string;
}

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    bio?: string;
    role: Role;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    auths: IAuthProvider[];
    address?: string; // ✅ add this
}