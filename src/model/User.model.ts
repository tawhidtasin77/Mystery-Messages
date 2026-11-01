import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
)

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyOtp: string;
    otpExpiry: Date;
    isVerified: boolean,
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        verifyOtp: {
            type: String,
            required: [true, "OTP verification is required"]
        },
        otpExpiry: {
            type: Date
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isAcceptingMessage: {
            type: Boolean,
            default: true
        },
        messages: [MessageSchema]
    }
)

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;