// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Code2 } from 'lucide-react';

// const Navbar = () => {
//     const navigate = useNavigate();

//     return (
//         <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5">
//             {/* LOGO: White Highlight with Orange Shimmer */}
//             <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
//                 <div className="p-2 bg-white/10 border border-white/20 rounded-lg group-hover:border-orange-500/50 transition-all">
//                     <Code2 size={22} className="text-white" />
//                 </div>
                
//                 {/* 70% White and then Orange/Amber wave */}
//                 <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white via-white/80 to-orange-600 bg-clip-text text-transparent">
//                             LeetLab
//                         </span>
//             </div>

//             {/* NAV LINKS: High Contrast + Animated Underline */}
//             <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[3px]">
//                 {['Home', 'Explore', 'TalkTown', 'contest'].map((item) => (
//                     <a 
//                         key={item}
//                         href="#" 
//                         className="nav-link text-white hover:text-white transition-colors opacity-100"
//                     >
//                         {item}
//                     </a>
//                 ))}
//             </div>

//             {/* AUTH BUTTONS */}
//             <div className="flex items-center gap-8">
//                 <button 
//                     onClick={() => navigate('/login')}
//                     className="text-xs font-black tracking-widest text-white hover:text-orange-400 transition-colors"
//                 >
//                     LOG IN
//                 </button>
//                 <button 
//                     onClick={() => navigate('/signup')}
//                     className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase hover:bg-[#ff8c00] hover:text-white transition-all shadow-xl active:scale-95"
//                 >
//                     Get Started
//                 </button>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Code2 } from 'lucide-react';
import { FlaskConical } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex items-center justify-between bg-black/40 backdrop-blur-md border-b border-white/5 font-sans">
            {/* LOGO: White Highlight with Orange Shimmer */}
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

            {/* NAV LINKS: Pic ke mutabik Font aur Styles */}
            <div className="hidden md:flex items-center gap-10 text-[15px] font-medium tracking-normal capitalize">
                {['Home', 'Explore', 'TalkTown', 'Contest'].map((item) => (
                    <div key={item} className="relative group">
                        <a 
                            href="#" 
                            className={`transition-colors ${item === 'Home' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {item}
                        </a>
                        {/* Active Underline like in pic */}
                        {item === 'Home' && (
                            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-orange-500 rounded-full" />
                        )}
                    </div>
                ))}
            </div>

            {/* AUTH BUTTONS: Clean Sans-serif Font */}
            <div className="flex items-center gap-8">
                <button 
                    onClick={() => navigate('/login')}
                    className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                    Log in
                </button>
                <button 
                    onClick={() => navigate('/signup')}
                    className="bg-white text-black px-8 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95"
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;