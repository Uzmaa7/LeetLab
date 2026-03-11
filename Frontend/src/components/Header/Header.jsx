
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
// import { Code2 } from 'lucide-react';
import { FlaskConical } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserContext();

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

            {/* NAV LINKS */}
            <div className="hidden md:flex items-center gap-10 text-[15px] font-medium tracking-normal capitalize">
                {['Home', 'Explore', 'TalkTown', 'Contest'].map((item) => (
                    <div key={item} className="relative group">
                        {/* <a
                            href="#"
                            className={`transition-colors ${item === 'Home' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {item}
                        </a>
                       
                        {item === 'Home' && (
                            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-orange-500 rounded-full" />
                        )} */}


                        <button
            onClick={() => {
                if (item === 'Contest') {
                    // Hum /user/contests par bhej rahe hain aur state mein flag set kar rahe hain
                    navigate('/user/contests/lobby', { state: { showActions: true } });
                } else {
                    navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`);
                }
            }}
           className={`transition-colors ${item === 'Contest' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
        >
            {item}
        </button>
                    </div>
                ))}
            </div>

            {/* AUTH BUTTONS: Clean Sans-serif Font */}
            {/* <div className="flex items-center gap-8">
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
            </div> */}

            <div className="flex items-center gap-8">
                {isAuthenticated ? (
                    <UserMenu />
                ) : (
                    <>
                        <button onClick={() => navigate('/user/login')} className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors">Log in</button>
                        <button onClick={() => navigate('/user/signup')} className="bg-white text-black px-8 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95">Get Started</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;