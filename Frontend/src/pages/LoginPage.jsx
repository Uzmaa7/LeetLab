






import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, FlaskConical, Sparkles, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { loginService } from "../services/auth.service.js";
import { useUserContext } from "../contexts/UserContext";
import toast from "react-hot-toast";
import Background3D from "../components/Background3D";
import { LeetButton } from '../components/index.jsx';



const ThinkingCoderVisual = () => (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        {/* Glow Shadow - Removed grey, added very faint green hint */}
        <div className="absolute -bottom-2 inset-x-4 h-3 bg-green-950/10 blur-xl rounded-full"></div>
        
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            {/* Body/Jacket - Now with Green Stroke */}
            <path d="M20,95 Q50,60 80,95 L80,105 Q50,115 20,105 Z" fill="#080808" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M25,95 L35,80 M75,95 L65,80" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" /> {/* Arms crossed - Green */}
            
            {/* Lower Body - Cross-legged pose indicators - Green */}
            <path d="M15,100 L25,105 Q50,110 75,105 L85,100" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            
            {/* Face - Minimalist Dark with Green Stroke */}
            <circle cx="50" cy="40" r="28" fill="#050505" stroke="#22c55e" strokeWidth="1.5" />
            
            {/* Eyes - Now Green and slightly re-positioned for better balance with the smile */}
            <motion.g animate={{ y: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 5 }}>
                <circle cx="40" cy="38" r="3" fill="#22c55e" />
                <circle cx="60" cy="38" r="3" fill="#22c55e" />
            </motion.g>
            
            {/* NEW Mouth - Smiling Curve (Green) */}
            <path d="M40,50 Q50,60 60,50" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
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

const LoginPage = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const infoRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAuth } = useUserContext();

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(infoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 })
          .fromTo(formRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.4");
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await loginService({ email, password });
            
            if (response?.user && response?.accessToken) {
                setAuth(response.accessToken, response.user, response.refreshToken);
                toast.success(`Welcome back, ${response.user.username}!`);
                navigate("/");
                setEmail("");
                setPassword("");
            }
        } catch (error) {
            toast.error(error?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative bg-black font-sans text-zinc-400 selection:bg-orange-500/30 overflow-x-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Background3D />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full">
                
                {/* LEFT SIDE: Narrative Experience */}
                <div ref={infoRef} className="w-full lg:w-[45%] p-8 sm:p-16 flex flex-col justify-between bg-black/40 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-white/5 min-h-[650px] lg:h-screen sticky lg:top-0 overflow-visible">
                    
                    <div className="flex items-center gap-3 group cursor-pointer z-50 mb-4" onClick={() => navigate('/')}>
                        <FlaskConical size={32} className="text-white transition-all transform rotate-[15deg] group-hover:rotate-[25deg] group-hover:text-orange-500" />
                        <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white to-orange-600 bg-clip-text text-transparent uppercase">LeetLab</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-12 sm:gap-16 relative z-30 py-8 overflow-visible">
                        <div className="flex items-start gap-4 sm:gap-6 self-start relative mt-32 sm:mt-40">
                            <ThinkingCoderVisual />
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}
                                className="absolute -top-28 -left-4 sm:-left-12 w-64 sm:w-72 bg-zinc-950/80 border border-white/5 p-5 rounded-3xl shadow-2xl z-40 backdrop-blur-sm">
                                <p className="text-[12px] sm:text-[13px] font-medium text-zinc-300 leading-relaxed italic">
                                    "I remember the patterns, but I've lost my <span className="text-orange-500 font-bold italic">access key</span>... need to get back in."
                                </p>
                                <div className="absolute -bottom-2 left-8 w-4 h-4 bg-zinc-950 border-r border-b border-white/5 rotate-45"></div>
                            </motion.div>
                        </div>

                        <div className="flex items-end gap-4 sm:gap-6 self-end text-right flex-row-reverse relative -mt-8 sm:-mt-12">
                            <HappyCoderVisual />
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5 }}
                                className="relative bg-zinc-950/80 border border-orange-500/10 p-4 sm:p-5 rounded-t-3xl rounded-bl-3xl w-56 sm:w-64 shadow-lg backdrop-blur-md">
                                <p className="text-[13px] sm:text-[14px] font-bold text-white leading-relaxed">
                                    Welcome back! <br/>
                                    <span className="text-orange-500 uppercase italic font-black">LeetLab</span> knows you. Enter your details to resume your <span className="text-orange-400 italic">streak.</span>
                                </p>
                                <div className="absolute -right-3 bottom-5 w-4 h-4 bg-zinc-950 border-r border-b border-orange-500/10 rotate-[-135deg]"></div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 z-40 relative mt-6">
                        <div className="h-[1px] w-12 bg-orange-600/50 rounded-full" />
                        <span className="text-[9px] font-black tracking-[0.4em] text-zinc-700 uppercase italic">Session Terminal</span>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form */}
                <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-12 z-10">
                    <motion.div ref={formRef} className="w-full max-w-[400px] bg-[#0A0A0A]/80 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
                        <div className="mb-8">
                            <h3 className="text-2xl font-black tracking-tight text-white uppercase italic leading-none">Welcome Back</h3>
                            <div className="flex items-center gap-2 mt-3">
                                <Binary size={14} className="text-orange-500" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest animate-pulse">please enter your detail to sign in</span>
                            </div>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    placeholder="your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-black/40 border border-white/5 py-3.5 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all text-xs font-bold text-white placeholder:text-zinc-800" 
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="enter password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-black/40 border border-white/5 py-3.5 pl-12 pr-12 rounded-2xl focus:outline-none focus:border-orange-500/50 transition-all text-xs font-bold text-white placeholder:text-zinc-800 uppercase" 
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors">
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            <div className="flex justify-end pr-1">
                                <NavLink to="/forgot-password" size={12} className="text-[10px] text-zinc-500 hover:text-orange-500 font-bold uppercase tracking-wider transition-colors">
                                    Forgot Key?
                                </NavLink>
                            </div>

                            <LeetButton 
                                type="submit" 
                                disabled={loading} 
                                text={loading ? "AUTHENTICATING..." : "SIGN IN ACCESS"} 
                                icon={ArrowRight} 
                                className="w-full justify-center py-4 rounded-2xl text-[10px]" 
                            />
                        </form>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-[1px] bg-white/5 flex-1"></div>
                            <span className="text-[9px] text-zinc-800 font-bold uppercase tracking-[3px]">OR</span>
                            <div className="h-[1px] bg-white/5 flex-1"></div>
                        </div>

                        <button className="w-full bg-white/5 border border-white/10 text-zinc-400 py-3 rounded-xl font-bold flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-3.5" alt="google" />
                            Sign in with Google
                        </button>

                        <p className="text-center mt-8 text-[10px] font-bold text-zinc-600  tracking-widest">
                            Don't have an account?{" "}
                            <NavLink to="/user/signup" className="text-orange-500 hover:text-orange-400 font-black transition-colors underline underline-offset-4 decoration-orange-500/20">
                                Create account
                            </NavLink>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;