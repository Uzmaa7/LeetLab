
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { UserRolesEnum } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config({
    path: "./.env"
})

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

export {registerUser};