import React from "react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z } from "zod";

import AuthImagePattern from '../components/AuthImagePattern';
// import { useAuthStore } from "../store/useAuthStore";

import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const SignUpSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be atleast of 8 characters"),
    fullname: z.string().min(3, "Name must be atleast 3 character")
})

function SignUpPage() {

    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(SignUpSchema) });
    const [showPassword, setShowPassword] = useState(false);


    const create = async (data)=>{
   
     console.log(data);
   }
  


    return (
        <div className='h-screen grid lg:grid-cols-2'>
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Code className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Welcome </h1>
                            <p className="text-base-content/60">Sign Up to your account</p>
                        </div>
                    </div>



                    {/* //////////////////////////////////////////////////////////////////// */}
                    {/* form */}
                    <form onSubmit={handleSubmit(create)} className="space-y-6">

                        {/* fullname */}
                        <div className="form-control">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Code className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("fullname")}
                                    className={`input input-bordered w-full pl-10 ${errors.name ? "input-error" : ""
                                        }`}
                                />

                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>


                        {/* email */}
                        <div className="form-control">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : ""
                                        }`}
                                />

                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>



                        {/* password */}

                        <div className="form-control">

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : ""
                                        }`}
                                />

                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {showPassword ?
                                        (<EyeOff className="h-5 w-5 text-base-content/40" />)
                                        :
                                        (<Eye className="h-5 w-5 text-base-content/40" />)
                                    }
                                </button>

                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* submit button */}
                        <button
              type="submit"
              className="btn btn-primary w-full"
             
            >
              
                Sign in
              
            </button>
                    </form>



                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* auth */}
            <AuthImagePattern
                title={"Welcome to our platform!"}
                subtitle={
                    "Sign up to access our platform and start using our services."
                }
            />
            {/*  //////////////////////////////////////////////////////////////////         */}
        </div>
    )

}

export default SignUpPage;