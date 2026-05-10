
import { Home, MessageSquare, UserPlus, PlusSquare, Search, LogOut } from 'lucide-react';

const Sidebar = ({ setView, activeView, openCreatePost, openSearch }) => {

    const navItems = [
        { id: 'feed', label: 'Feed', icon: Home },
        { id: 'search', label: 'Search', icon: Search },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'requests', label: 'Requests', icon: UserPlus },
    ];
    

    return (
        <div className="w-20 border-r border-zinc-800 h-screen sticky top-0 flex flex-col items-center py-8 gap-10 bg-black">
            {/* Logo  */}
            <div className="text-xl font-bold italic text-white tracking-tighter">
                T
            </div>
            
            <nav className="flex flex-col gap-4 w-full px-3">
                
                {navItems.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => {
                            // Agar search click hua toh modal kholo, warna view set karo
                            if (item.id === 'search') {
                                openSearch();
                            } else {
                                setView(item.id);
                            }
                        }}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all group
                           ${activeView === item.id && item.id !== 'search' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`}
                    >
                        <item.icon size={24} strokeWidth={activeView === item.id ? 2.5 : 1.8} />
                        {/* <span className={`hidden lg:block text-md ${activeView === item.id ? 'font-bold' : 'font-medium'}`}>
                            {item.label}
                        </span> */}
                    </button>
                ))}

                <button 
                    onClick={openCreatePost}
                    title="Create Post"
                    className="flex items-center justify-center p-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 transition-all mt-2 w-full"
                >
                    <PlusSquare size={26} strokeWidth={1.5} />
                </button>
            </nav>

            {/* Bottom Section - Optional Profile/Logout */}
            <div className="mt-auto mb-4 w-full px-3">
                 <button className="flex items-center justify-center p-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-red-400 transition-all w-full">
                    <LogOut size={24} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;