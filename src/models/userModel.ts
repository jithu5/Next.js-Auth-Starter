// userModel.ts
import mongoose, { Document, Schema } from "mongoose";

// Define an interface to type the User document
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
    isVerified: boolean;
    verifyToken: string;
    verifyTokenExpiry: Date;
}

// Create the user schema
const UserSchema: Schema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,  // Optional: to trim spaces around the username
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // Optional: ensures emails are stored in lowercase
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,

    },
    forgotPasswordToken: {
        type: String,

    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields



// Create and export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
