import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
    
})
const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;