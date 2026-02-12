import { model, Schema } from "mongoose";
import { IUser, IAuthProvider, Role, IsActive } from "./user.interface";

// Auth provider sub-schema
const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
}, { versionKey: false, _id: false });

// User schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { 
        type: String, 
        enum: Object.values(Role), 
        default: Role.CUSTOMER // রেস্টুরেন্টের কেসে ডিফল্ট কাস্টমার
    },
    phone: { type: String },
    picture: { type: String },               // profile image
    bio: { type: String, default: "" },     // bio/about
    address: { type: String, default: "" }, // address
    isDeleted: { type: Boolean, default: false },
    isActive: { 
        type: String, 
        enum: Object.values(IsActive), 
        default: IsActive.ACTIVE 
    },
    isVerified: { type: Boolean, default: false },
    auths: [authProviderSchema],
}, { timestamps: true, versionKey: false });

export const User = model<IUser>("User", userSchema);