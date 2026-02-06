import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({
    path: "./.env"
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [3, "username must be atleast 3 characters long"],
        maxlength: 20,

    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,

    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, "password must be atleast 8 characters long"]
    },

    fullname: {
        type: String,
        required: true,
        minlength: [3, "fullname must be atleast 3 characters long"],
    },

    role: {
        type: String,
        enum: AvailableUserRoles,
        default: UserRolesEnum.STUDENT
    },

    avatar: {
        type:String,

    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationToken: {
        type: String,
    },

    verificationTokenExpiry: {
        type: Date
    },

    passwordResetToken: {
        type: String,
    },

    passwordResetTokenExpiry: {
        type: Date,
    },

    refreshToken: {
        type: String,
    },

}, {timestamps:true});



// =============userSchema.methods===========================//
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id,
            role : this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
            
}






const User = mongoose.model("User", userSchema);

export default User;