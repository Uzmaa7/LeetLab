import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config({
    path: "./.env"
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
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
        public_id: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
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
    //all the problems created by admin
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
    }],

    submission: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Submission"
        }
    ],

    solvedProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProblemSolved"
    }],

    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }],
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


userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}






const User = mongoose.model("User", userSchema);

export default User;