
import { Home, MessageSquare, UserPlus, PlusSquare, Search, LogOut } from 'lucide-react';

const Sidebar = ({ setView, activeView, openCreatePost, openSearch }) => {

    const navItems = [
        { id: 'feed', label: 'Feed', icon: Home },
        { id: 'search', label: 'Search', icon: Search },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'requests', label: 'Requests', icon: UserPlus },
    ];


    return (
        <div className="fixed bottom-0 left-0 w-full h-16 bg-black border-t border-zinc-800 flex flex-row items-center justify-around z-50 
                        md:relative md:h-screen md:w-20 md:flex-col md:border-r md:border-t-0 md:py-8 md:gap-10 md:justify-start">

            {/* Logo - hide on mobile screen */}
            <div className="hidden md:block text-xl font-bold italic text-white tracking-tighter">
                T
            </div>

            <nav className="flex flex-row md:flex-col gap-2 md:gap-4 w-full px-2 md:px-3 justify-around md:justify-start items-center">

                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {

                            if (item.id === 'search') {
                                openSearch();
                            } else {
                                setView(item.id);
                            }
                        }}
                        className={`flex items-center justify-center p-3 rounded-xl transition-all group
                           ${activeView === item.id && item.id !== 'search' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`}
                    >
                        <item.icon size={24} strokeWidth={activeView === item.id ? 2.5 : 1.8} />

                    </button>
                ))}

                <button
                    onClick={openCreatePost}
                    title="Create Post"
                    className="flex items-center justify-center p-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 transition-all w-fit md:w-full"
                >
                    <PlusSquare size={26} strokeWidth={1.5} />
                </button>
            </nav>

            {/* Bottom Section - Optional Profile/Logout */}
            <div className="hidden md:flex mt-auto mb-4 w-full px-3">
                <button className="flex items-center justify-center p-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-red-400 transition-all w-full">
                    <LogOut size={24} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;