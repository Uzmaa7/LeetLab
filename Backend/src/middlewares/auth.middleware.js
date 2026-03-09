import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import { UserRolesEnum } from "../utils/constants.js";

dotenv.config({
    path: "./.env"
})


export const verifyJWT = async (req, res, next) => {
    // console.log("Cookies received:", req.cookies);
    try {
        const token = req.cookies?.accessToken || req.header
        ("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            return res.status(401).json({
                message: "Unauthorized request"
            })
        }
    
        //token is genuine or not?
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
            if(!user){
                return res.status(401).json({
                    message: "Invalid Access Token"
                })
            }
    
            req.user = user;//req.user me user object hai pura
            next();
            
    } catch (error) {
        console.log("verifyJWT error", error);
        return res.status(401).json({
            message: "Invalid access token"
        })
    }

    
}

export const checkAdmin = async (req, res, next)=> {
    try {
        const userId = req.user._id;
        //req.user might contain outdated session data, 
        //whereas a database lookup ensures you are verifying the user's "real-time" status
        // and permissions.
        const user = await User.findById(userId);
        if(!user || user.role !== UserRolesEnum.ADMIN){
            return res.status(403).json({
                message: "Access denied - Admin only"
            })
        }
        next();
    } catch (error) {
        console.log("error checking admin role", error);
        res.status(500).json({
            message: "error checking admin role"
        })
    }
}