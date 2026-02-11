import React from "react";
import { useState } from "react";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {z} from "zod";

import {Code, Eye, EyeOff, Loader2, Lock, Mail} from "lucide-react";

const SignUpSchema = z.object({
  email:z.string().email("Enter a valid email"),
  password:z.string().min(8 , "Password must be atleast of 8 characters"),
  fullname:z.string().min(3 , "Name must be atleast 3 character")
})

function SignUpPage() {

    const {register, handleSubmit, formState:{errors},} = useForm({resolver:zodResolver(SignUpSchema)});
    const [showPassword, setShowPassword] = useState(false);


    const create = async (data) => {
        setError("")
        try {
            
        } catch (error) {
            setError(error.message)
        }
    }


    return(
        <div>
        {/* //////////////////////////////////////////////////////////////////// */}
            {/* form */}
            <form onSubmit={handleSubmit(create)}>

                {/* fullname */}
                <input
                type="text"
                placeholder="Enter your name"
                {...register("fullname")}
                />

                {/* email */}
                <input
                type="email"
                placeholder="Enter your email"
                {...register("email")} 
                />

                {/* password */}
                <input 
                type= {showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                />

                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 
                    (<EyeOff className="h-5 w-5 text-base-content/40"/>)
                    : 
                    (<Eye className="h-5 w-5 text-base-content/40" />)
                    }
                </button>
                
                {/* submit button */}
                <button type="submit">
                    Sign in
                </button>
            </form>

    {/*  //////////////////////////////////////////////////////////////////         */}
        </div>
    )
    
}

export default SignUpPage;