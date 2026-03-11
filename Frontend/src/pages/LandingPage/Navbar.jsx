








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FlaskConical, Menu, X } from 'lucide-react'; // Menu icons for responsiveness

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

    const navLinks = ['Home', 'Explore', 'TalkTown', 'Contest'];

    return (
        <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5 font-sans">
            {/* LOGO: Exact Same Styling */}
            <div className="flex items-center  cursor-pointer group" onClick={() => navigate('/')}>
                
                {/* Icon is now tilted 15 degrees to the right */}
                 <FlaskConical 
                    size={26} 
                    className="text-white group-hover:text-orange-500 transition-all duration-300 transform rotate-[15deg] group-hover:rotate-[25deg]" 
                />
                
                {/* Font weight adjusted for sharp professional look */}
                <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white via-white/80 to-orange-600 bg-clip-text text-transparent">
                    LeetLab
                </span>
            </div> 

            {/* DESKTOP NAV LINKS: Visible on md+ devices */}
            <div className="hidden md:flex items-center gap-10 text-[15px] font-medium tracking-normal capitalize">
                {navLinks.map((item) => (
                    <div key={item} className="relative group">
                        <a 
                            href="#" 
                            className={`transition-colors ${item === 'Home' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {item}
                        </a>
                        {item === 'Home' && (
                            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-orange-500 rounded-full" />
                        )}
                    </div>
                ))}
            </div>

            {/* AUTH BUTTONS: Correct Redirects and Desktop View */}
            <div className="hidden md:flex items-center gap-8">
                <button 
                    onClick={() => navigate('/user/login')} // Corrected Route
                    className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                    Log in
                </button>
               <button 
    onClick={() => navigate('/user/signup')}

    className="group relative px-8 py-2.5 bg-zinc-900 border border-zinc-700 hover:border-orange-500/50 rounded-xl transition-all duration-300 outline-none focus:outline-none"
    style={{ 
        boxShadow: 'none', 
        filter: 'none', 
        backdropFilter: 'none',
        WebkitBoxShadow: 'none'
    }}
>
    {/* Orange subtle glow layer */}
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 pointer-events-none shadow-none" />
    
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300 group-hover:text-white transition-colors relative z-10">
        Get Started
    </span>

    {/* Bottom subtle orange line on hover */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-orange-500 group-hover:w-1/2 transition-all duration-500" />
</button>
            </div>

            {/* MOBILE HAMBURGER ICON */}
            <div className="md:hidden z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </div>

            {/* MOBILE MENU OVERLAY */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 z-[100] md:hidden">
                    {navLinks.map((item) => (
                        <a 
                            key={item}
                            href="#" 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-bold text-zinc-400 hover:text-white"
                        >
                            {item}
                        </a>
                    ))}
                    <div className="flex flex-col items-center gap-6 mt-4">
                        <button 
                            onClick={() => { navigate('/user/login'); setIsMenuOpen(false); }}
                            className="text-lg font-semibold text-zinc-400"
                        >
                            Log in
                        </button>
                        <button 
                            onClick={() => { navigate('/user/signup'); setIsMenuOpen(false); }}
                            className="bg-white text-black px-10 py-3 rounded-full text-lg font-bold"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;