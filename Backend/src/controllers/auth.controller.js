
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { UserRolesEnum } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registrationValidation } from "../validators/auth.Validators.js";
import sendRegistartionEmail from "../services/mail.service.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";



dotenv.config({
    path: "./.env"
})

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        
     console.log("Something went wrong while generation ACCESS and REFRESH tokens", error)
        
    }
}

const registerUser = async (req, res) => {

    const {username, fullname, email, password} = req.body;

    try{
        //find existed user
        const existingUser = await User.findOne(
            {
                $or: [{fullname}, {email}]
            }
        )

        if(existingUser){
            return res.status(400).json({
                message: "User already Exist"
            })
        }

        //create new user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            fullname,
            password: hashedPassword,
            role: UserRolesEnum.STUDENT
        })

        if(!user){
            return res.status(400).json({
                message: "Something went wrong while registering user"
            })
        }

        const token = jwt.sign(
            {_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"} 
        )

        res.cookie("accessToken", token,
            {
                httpOnly:true,
                
                sameSite: "lax", 
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7days
            }
        )

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            }
        })

        await sendRegistartionEmail(email, fullname);
    }
    catch(error){
        console.log("Error creating user", error);
        res.status(500).json({
            message: "Error creating user"
        })
    }
}


const loginUser = async (req, res) => {

    const {email , password} = req.body;

    try {
        //Does user exist??
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        //Password is correct??
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(401).json({
                message: "Invalid user credentials"
            })
        }

        //generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        //send these tokens to cookies
        const options = {
            httpOnly: true,//only server can modify now not frontend
            secure: true,
            sameSite: "none",
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken, options)
        .cookie("refreshToken",refreshToken, options)
        .json({
            message: "User logged In successfully",
            user: {
                loggedInUser,
                accessToken,
            }
        })
        
    } catch (error) {
        console.log("Error login user", error);
        res.status(500).json({
            message: "Error login user"
        })
    }
}

const logoutUser = async (req, res) => {
   try {
    //remove refreshtoken from db 
        await User.findByIdAndUpdate(req.user._id,
            {
            $set : {refreshToken: undefined} 
            },
            {
                new: true
            }
        );

        const options = {
            httpOnly: true,
            secure: true, 
            sameSite: "lax",
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken",options)
        .json({
            message: "User logged Out"
        })


   } catch (error) {
        console.log("Error logout user", error);
        res.status(500).json({
            message: "Error logout user"
        })
   }
}


const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    
    
        const {oldPassword, newPassword, confirmPassword } = req.body;
    
        if(oldPassword === newPassword){
            return res.status(400).json({
                success: false,
                message: "new password must be different from old password"
            })
        }
    
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "mismatch new password and confirm password"
            })
        }
    
        const isMatchedOldPassword = await user.verifyPassword(oldPassword);
        if(!isMatchedOldPassword){
            return res.status(401).json({
                success: false,
                message: "Invalid old password"
            })
        }
        
        const newPasswordHashed = await bcrypt.hash(newPassword, 10)
        user.password = newPasswordHashed;
    
        //revoke al sessions
        user.refreshToken = undefined;
    
        await user.save();
    
        const options = {
            httpOnly: true,
            secure: true, 
            sameSite: "lax",
        }
    
        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            message: "Password changed successfully"
        })
    
    } catch (error) {
        console.log("Error changePassword", error);
        res.status(500).json({
            message: "Error in changing password"
        })
    }


}


const updateAvatar = async (req, res) => {
    const localPath = req.file?.path
    if(!localPath){
        return res.status(400).json({
            message: "Avatar file is missing"
        })
    }

    //avatar file must be an image file
    if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({
            message: "Only image files are allowed"
        })
    }

    // Upload this file on cloudinary 
    const response = await uploadOnCloudinary(localPath);
    if(!response){
        return res.status(400).json({
            message: "error while uploading on cloudinary"
        })
    }

    try {
        
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        const oldPublicId = user.avatar.public_id;

        // 3. Database update karo naye public_id aur url ke saath
        const updatedUser = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    avatar: {
                        public_id: response.public_id,
                        url: response.url
                    }
                }
            },
            { new: true }
        ).select("-password -refreshToken");
    
        // 4. AGAR database update ho gaya, tab purana avatar Cloudinary se delete karo
        if (oldPublicId) {
            await deleteFromCloudinary([oldPublicId], "image");
        }


        return res.status(200).json({
                message: "Avatar updated successfully",
                user: updatedUser
        });


    } catch (error) {
        return res.status(500).json({ message: "updateAvatar error" });
    }

}
























//======endPoint so that user can refresh its access token=================
// as soon as your access token expires you can request for new access token
//for this u need to send your refresh token -> we will match it with db refresh token 
// and then refresh your both the tokens
const refreshAccessToken  = async ( req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken

    if(!incomingRefreshToken){
        return res.status(401).json({
            message: "unauthorized request"
        })
    }

    try {
        
        const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        if(!decodedRefreshToken){
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }

        //decodedRefreshToken has _id in its payload
        const user = await User.findById(decodedRefreshToken?._id);
        if(!user){
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }

        
        if(incomingRefreshToken !== user?.refreshToken){
            return res.status(401).json({
                message: "refresh token is expired or used"
            })
        }

        //generate new tokens

        const options = {
            httpOnly: true,
            secure: true,
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id);

        return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", newRefreshToken)
        .json({
            message: "Access token refreshed",
            tokens: {accessToken, refreshToken: newRefreshToken}
        })
        
    } catch (error) {
        console.log("refreshAccessToken error", error);
        res.status(500).json({
            message: "refreshAccessToken error"
        })
    }
}



 const check = async (req , res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"User authenticated successfully",
            user:req.user
        });
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({
            error:"Error checking user"
        })
    }
}
export {registerUser, loginUser, logoutUser, refreshAccessToken, check, changePassword, updateAvatar};