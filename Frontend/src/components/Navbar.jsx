import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5">
            {/* LOGO: White Highlight with Orange Shimmer */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                <div className="p-2 bg-white/10 border border-white/20 rounded-lg group-hover:border-orange-500/50 transition-all">
                    <Code2 size={22} className="text-white" />
                </div>
                
                {/* 70% White and then Orange/Amber wave */}
                <span className="text-2xl font-black tracking-tighter italic bg-gradient-to-r from-white via-white via-white to-[#ff8c00] bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer">
                    LEETLAB
                </span>
            </div>

            {/* NAV LINKS: High Contrast + Animated Underline */}
            <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[3px]">
                {['Problems', 'Contests', 'TalkTown', 'Pricing'].map((item) => (
                    <a 
                        key={item}
                        href="#" 
                        className="nav-link text-white hover:text-white transition-colors opacity-100"
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* AUTH BUTTONS */}
            <div className="flex items-center gap-8">
                <button 
                    onClick={() => navigate('/login')}
                    className="text-xs font-black tracking-widest text-white hover:text-orange-400 transition-colors"
                >
                    LOG IN
                </button>
                <button 
                    onClick={() => navigate('/signup')}
                    className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase hover:bg-[#ff8c00] hover:text-white transition-all shadow-xl active:scale-95"
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;