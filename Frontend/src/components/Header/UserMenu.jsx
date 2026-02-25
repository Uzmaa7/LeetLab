import { useState } from 'react';
import { User, LogOut, PlusSquare, ChevronDown } from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useUserContext();
    const navigate = useNavigate();

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all"
            >
                <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-zinc-300">{user?.username}</span>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                
                <div className="absolute right-0 mt-3 w-56 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl py-2 z-[110] backdrop-blur-xl">
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Account Role</p>
                        <p className="text-xs font-bold text-orange-500">{user?.role}</p>
                    </div>

                    <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 transition-colors">
                        <User size={16} /> My Profile
                    </button>

                    {user?.role === "admin" && (
                        <button onClick={() => navigate('/admin/create-problem')} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-orange-500 hover:bg-orange-500/5 transition-colors font-semibold">
                            <PlusSquare size={16} /> Create Problem
                        </button>
                    )}

                    <div className="h-[1px] bg-white/5 my-2" />
                    
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/5 transition-colors">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;