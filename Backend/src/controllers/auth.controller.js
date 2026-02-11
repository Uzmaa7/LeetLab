
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { UserRolesEnum } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


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
                $or: [{username}, {email}]
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
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"} 
        )

        res.cookie("jwtTOKEN", token,
            {
                httpOnly:true,
                sameSite:"strict",
                secure:process.env.NODE_ENV !== "development",
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7days
            }
        )

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                avatar: user.avatar
            }
        })
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
            httpOnly: true,//only server can modify now not frontend
            secure: true,
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

export {registerUser, loginUser, logoutUser, refreshAccessToken};