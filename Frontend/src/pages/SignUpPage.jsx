

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AtSign, ArrowRight, FlaskConical, ShieldCheck, Sparkles, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { api } from '../services/api.services.js';
import toast from 'react-hot-toast';
import Background3D from "../components/Background3D";
import { LeetButton } from '../components/index.jsx';

// Character Components (Strictly Minimalist SVG)
const ThinkingCoderVisual = () => (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <div className="absolute -bottom-2 inset-x-4 h-3 bg-zinc-700/10 blur-xl rounded-full"></div>
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M20,95 Q50,60 80,95 L80,105 Q50,115 20,105 Z" fill="#111" stroke="#333" strokeWidth="1" />
            <path d="M25,95 L35,80 M75,95 L65,80" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <path d="M15,100 L25,105 Q50,110 75,105 L85,100" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="20" cy="102" rx="4" ry="2" fill="#333" opacity="0.5"/>
            <ellipse cx="80" cy="102" rx="4" ry="2" fill="#333" opacity="0.5"/>
            <circle cx="50" cy="40" r="28" fill="#050505" stroke="#333" strokeWidth="2" />
            <motion.g animate={{ y: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
                <circle cx="40" cy="35" r="3" fill="#333" />
                <circle cx="60" cy="35" r="3" fill="#333" />
            </motion.g>
            <path d="M42,50 Q50,45 58,50" stroke="#333" strokeWidth="2" fill="none" />
        </svg>
    </div>
);

const HappyCoderVisual = () => (
    <div className="relative w-24 h-32 sm:w-28 sm:h-36">
        <div className="absolute -bottom-4 inset-x-2 h-4 bg-orange-600/5 blur-[80px] rounded-full"></div>
        <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-md">
            <path d="M25,100 Q50,80 75,100" stroke="#ea580c" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M30,95 L15,80 M70,95 L85,80" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="38" y="100" width="8" height="25" fill="#111" rx="1" stroke="#ea580c" strokeWidth="1" />
            <rect x="54" y="100" width="8" height="25" fill="#111" rx="1" stroke="#ea580c" strokeWidth="1" />
            <path d="M38,125 L34,130 L46,130 L46,125 Z M54,125 L50,130 L62,130 L62,125 Z" fill="#ea580c" opacity="0.9" />
            <circle cx="50" cy="40" r="28" fill="#080808" stroke="#ea580c" strokeWidth="1.5" />
            <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 4 }}>
                <circle cx="40" cy="35" r="3" fill="#ea580c" />
                <circle cx="60" cy="35" r="3" fill="#ea580c" />
            </motion.g>
            <path d="M40,50 Q50,60 60,50" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
    </div>
);

const SignupPage = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const infoRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 1. State for password visibility

    const [formData, setFormData] = useState({
        username: "", fullname: "", email: "", password: "", role: "student",
    });

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(infoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 })
          .fromTo(formRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.4");
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/register", formData);
            toast.success(res?.data?.message || "User created successfully");
            setTimeout(() => { navigate("/user/login"); }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating user");
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen w-full relative bg-black font-sans text-zinc-400 selection:bg-orange-500/30 overflow-x-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Background3D />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full">
                
                {/* LEFT SIDE: Narrative Experience */}
                <div ref={infoRef} className="w-full lg:w-[45%] p-8 sm:p-16 flex flex-col justify-between bg-black/40 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-white/5 min-h-[600px] lg:h-screen sticky lg:top-0 overflow-visible">
                    
                     <div className="flex items-center  cursor-pointer group" onClick={() => navigate('/')}>
                    
                                    {/* Icon is now tilted 15 degrees to the right */}
                                    <FlaskConical
                                        size={48}
                                        className="text-white group-hover:text-orange-500 transition-all duration-300 transform rotate-[15deg] group-hover:rotate-[25deg]"
                                    />
                    
                                    {/* Font weight adjusted for sharp professional look */}
                                    <span className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-white via-white/80 to-orange-600 bg-clip-text text-transparent">
                                        LeetLab
                                    </span>
                                </div>

                    <div className="flex-1 flex flex-col justify-center gap-12 sm:gap-16 relative z-30 py-8 overflow-visible">
                        <div className="flex items-start gap-4 sm:gap-6 self-start relative mt-32 sm:mt-40">
                            <ThinkingCoderVisual />
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}
                                className="absolute -top-24 -left-4 sm:-left-12 w-56 sm:w-64 bg-zinc-950/80 border border-white/5 p-4 sm:p-5 rounded-3xl shadow-2xl z-40 backdrop-blur-sm">
                                <p className="text-[12px] sm:text-[13px] font-medium text-zinc-300 italic">
                                   "I've solved <span className="text-orange-500 font-bold">400+</span> problems, but the thought of revision is <span className="text-rose-500 font-semibold underline decoration-white/10 decoration-wavy underline-offset-4">killing</span> me. It's just so repetitive..."
                                </p>
                                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-zinc-950 border-r border-b border-white/5 rotate-45"></div>
                            </motion.div>
                        </div>

                        <div className="flex items-end gap-4 sm:gap-6 self-end text-right flex-row-reverse relative -mt-8 sm:-mt-12">
                            <HappyCoderVisual />
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5 }}
                                className="relative bg-zinc-950/80 border border-orange-500/10 p-4 sm:p-5 rounded-t-3xl rounded-bl-3xl w-56 sm:w-64 shadow-lg backdrop-blur-md">
                                <p className="text-[13px] sm:text-[14px] font-bold text-white leading-relaxed">
                                    Dont worry! <br/>
                                    <span className="text-orange-500 uppercase italic">LeetLab</span> is here. Now you can <span className="text-orange-400 italic underline decoration-orange-500/30 underline-offset-4">revise easily.</span>
                                </p>
                                <div className="absolute -right-3 bottom-5 w-4 h-4 bg-zinc-950 border-r border-b border-orange-500/10 rotate-[-135deg]"></div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 z-40 relative mt-6">
                        <div className="h-[1px] w-12 bg-orange-600/50 rounded-full" />
                        <span className="text-[9px] font-black tracking-[0.4em] text-zinc-700 uppercase italic">Sequence Terminal</span>
                    </div>
                </div>

                {/* RIGHT SIDE: Signup Form */}
                <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-12 z-10">
                    <motion.div ref={formRef} className="w-full max-w-[400px] bg-[#0A0A0A]/80 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
                        <div className="mb-8">
                            <h3 className="text-2xl font-black tracking-tight text-white uppercase italic leading-none">Create Your Account</h3>
                            <div className="flex items-center gap-2 mt-3">
                                <Binary size={14} className="text-orange-500" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest animate-pulse">Let's get start</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} value={formData.fullname} required
                                    className="w-full bg-black/40 border border-white/5 py-3.5 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all text-xs font-bold text-white placeholder:text-zinc-800" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative group">
                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={16} />
                                    <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} required
                                        className="w-full bg-black/40 border border-white/5 py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all text-[10px] font-bold text-white placeholder:text-zinc-800" />
                                </div>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={16} />
                                    <select name="role" onChange={handleChange} value={formData.role}
                                        className="w-full bg-black/40 border border-white/5 py-3.5 pl-10 pr-4 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all text-[10px] font-bold appearance-none cursor-pointer text-zinc-500 uppercase">
                                        <option value="student">STUDENT</option>
                                        <option value="admin">ADMIN</option>
                                    </select>
                                </div>
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input type="email" name="email" placeholder="Email Verification" onChange={handleChange} value={formData.email} required
                                    className="w-full bg-black/40 border border-white/5 py-3.5 pl-12 pr-4 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all text-xs font-bold text-white placeholder:text-zinc-800" />
                            </div>

                            {/* Password Field with Eye Toggle */}
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} // 2. Dynamic type toggle
                                    name="password" 
                                    placeholder="Password" 
                                    onChange={handleChange} 
                                    value={formData.password} 
                                    required
                                    className="w-full bg-black/40 border border-white/5 py-3.5 pl-12 pr-12 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all text-xs font-bold text-white placeholder:text-zinc-800" 
                                />
                                {/* 3. Toggle Button */}
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <LeetButton type="submit" disabled={loading} text={loading ? "SYNCING..." : "REGISTER ACCOUNT"} icon={ArrowRight} className="w-full justify-center py-4 rounded-2xl text-[10px]" />
                        </form>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-[1px] bg-white/5 flex-1"></div>
                            <span className="text-[9px] text-zinc-800 font-bold uppercase tracking-[3px]">OR</span>
                            <div className="h-[1px] bg-white/5 flex-1"></div>
                        </div>

                        <button className="w-full bg-white/5 border border-white/10 text-zinc-400 py-3 rounded-xl font-bold flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-3.5" alt="google" />
                            Continue with Google
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;