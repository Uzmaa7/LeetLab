import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Ye import karein
import { User, Mail, Lock, AtSign, ArrowRight, Code2, Terminal, Trophy, Users } from 'lucide-react';
import { gsap } from 'gsap';
import API from '../services/auth.service.js';
import toast from 'react-hot-toast';
import Background3D from "../components/Background3D";

const Signup = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const infoRef = useRef(null);
    const [loading, setLoading] = useState(false);
    
    
    // Exactly as per your Register Controller
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(infoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 })
          .fromTo(formRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.5");
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // This hits: authRouter.post("/register", ...)
            const res = await API.post("/auth/register", formData);
            toast.success(res.data.message || "User created successfully");

            // 3. Redirect Logic: 2 second baad Home page par
                setTimeout(() => {
                    navigate("/"); // Ya jo bhi aapka home route hai (e.g., "/home")
                }, 2000);

                
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative overflow-hidden bg-black font-sans text-white">
            <Background3D />

            <div className="relative z-10 h-full w-full flex">
                
                {/* LEFT SIDE: LeetLab Info */}
                <div ref={infoRef} className="hidden lg:flex flex-col justify-center items-start w-[45%] p-12 bg-black/10 backdrop-blur-sm border-r border-white/5 h-full">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/30">
                            <Code2 size={30} className="text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight italic text-blue-500">LEETLAB</span>
                    </div>
                    
                    <h1 className="text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                        Code. Compete. <br />
                        <span className="text-blue-500 text-6xl font-black">Connect.</span>
                    </h1>
                    
                    <div className="space-y-8 mt-4">
                        <div className="flex items-center gap-5">
                            <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/20">
                                <Terminal size={22} className="text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-200 uppercase text-xs tracking-widest">Interactive Coding</h4>
                                <p className="text-xs text-gray-500">Sharpen your skills in our secure lab.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="bg-purple-600/20 p-3 rounded-xl border border-purple-500/20">
                                <Trophy size={22} className="text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-200 uppercase text-xs tracking-widest">Global Contests</h4>
                                <p className="text-xs text-gray-500">Compete with the best coders worldwide.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Full Signup Form */}
                <div className="flex-1 flex items-center justify-center p-6">
                    <div ref={formRef} className="w-full max-w-[420px] bg-white/[0.03] backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold tracking-tight">Create Account</h3>
                            <p className="text-gray-500 text-sm mt-2">Enter your details to join LeetLab.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} value={formData.fullname} required
                                    className="w-full bg-black/40 border border-white/10 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                            </div>

                            {/* Username */}
                            <div className="relative group">
                                <AtSign className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} required
                                    className="w-full bg-black/40 border border-white/10 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                            </div>

                            {/* Email */}
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} required
                                    className="w-full bg-black/40 border border-white/10 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                            </div>

                            {/* Password */}
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required
                                    className="w-full bg-black/40 border border-white/10 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                            </div>

                            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4">
                                {loading ? "Registering..." : "Signup"} <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-[1px] bg-white/5 flex-1"></div>
                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[2px]">OR</span>
                            <div className="h-[1px] bg-white/5 flex-1"></div>
                        </div>

                        <button className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-3 text-sm hover:bg-white/10 transition-all">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4" alt="google" />
                            Signup with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;