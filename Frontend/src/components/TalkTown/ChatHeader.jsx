



import React, { useState } from 'react';
import { Phone, Video, MoreVertical, Info, LogOut, Trash2, UserPlus, ArrowLeft } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { useUserContext } from '../../contexts/UserContext';

import { useSocket } from '../../contexts/SocketContext';//


const ChatHeader = ({ chat, onOpenInfo, onAddMember }) => {
    const [showMenu, setShowMenu] = useState(false);
    const { user: currentUser } = useUserContext();
    
    const { setActiveChat } = useChat(); 

  
    const isAdmin = chat.groupChat && chat.createdBy === currentUser?._id;

    const { onlineUsers } = useSocket();

    const otherMemberId = !chat.groupChat
        ? chat.members.find(id => id !== currentUser?._id)
        : null;


    const isOnline = otherMemberId && onlineUsers.includes(otherMemberId);
    // return (
    //     <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-20">

    //         {/* Left: Avatar & Name (Clicking here also opens info) */}
    //         <div className="flex items-center gap-3 cursor-pointer group" onClick={onOpenInfo}>
    //             <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-700 group-hover:border-zinc-500 transition">
    //                 {chat.name[0]}
    //             </div>
    //             <div>
    //                 <h3 className="font-semibold text-sm text-white">{chat.name}</h3>
    //                 <span className={`text-[10px] font-medium italic transition-colors duration-300 ${isOnline ? 'text-green-500' : 'text-zinc-500'
    //                     }`}>
    //                     {chat.groupChat
    //                         ? `${chat.members.length} members`
    //                         : (isOnline ? "Online" : "Offline")
    //                     }
    //                 </span>
    //             </div>
    //         </div>

    //         {/* Right: Icons & Menu */}
    //         <div className="flex items-center gap-5 text-zinc-400 relative">
    //             <Phone size={19} strokeWidth={1.5} className="cursor-pointer hover:text-white transition" />
    //             <Video size={21} strokeWidth={1.5} className="cursor-pointer hover:text-white transition" />

    //             <div className="relative">
    //                 <button
    //                     onClick={() => setShowMenu(!showMenu)}
    //                     className="flex items-center justify-center p-1 hover:bg-zinc-900 rounded-full transition"
    //                 >
    //                     <MoreVertical size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white" />
    //                 </button>

    //                 {/* WhatsApp Style Dropdown */}
    //                 {showMenu && (
    //                     <>
    //                         {/* Transparent overlay to close menu when clicking outside */}
    //                         <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)}></div>

    //                         <div className="absolute right-0 mt-3 w-52 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-40 overflow-hidden py-1">
    //                             <button
    //                                 onClick={() => { onOpenInfo(); setShowMenu(false); }}
    //                                 className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-900 flex items-center gap-3 text-zinc-300 transition"
    //                             >
    //                                 <Info size={16} /> Group Info
    //                             </button>

    //                             {chat.groupChat && (
    //                                 <button onClick={() => { onAddMember(); setShowMenu(false); }} className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-900 flex items-center gap-3 text-zinc-300">
    //                                     <UserPlus size={16} /> Add Member
    //                                 </button>
    //                             )}

    //                             <button className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-900 flex items-center gap-3 text-red-500 border-t border-zinc-900">
    //                                 <LogOut size={16} /> Exit Group
    //                             </button>
    //                         </div>
    //                     </>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );


    return (
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-20">

            {/* Left Section: Back Button + Avatar + Name */}
            <div className="flex items-center gap-2 md:gap-3">
                
                {/* 1. Mobile Back Arrow (Visible only on small screens) */}
                <button 
                    onClick={() => setActiveChat(null)} 
                    className="md:hidden p-1 -ml-1 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={22} strokeWidth={2} />
                </button>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3 cursor-pointer group" onClick={onOpenInfo}>
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-700 group-hover:border-zinc-500 transition relative">
                        {chat.name[0]}
                        {/* Avatar Online Dot */}
                        {!chat.groupChat && isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm text-white truncate max-w-[120px] md:max-w-none">
                            {chat.name}
                        </h3>
                        <span className={`text-[10px] font-medium italic transition-colors duration-300 ${isOnline ? 'text-green-500' : 'text-zinc-500'}`}>
                            {chat.groupChat
                                ? `${chat.members.length} members`
                                : (isOnline ? "Online" : "Offline")
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Icons & Menu */}
            <div className="flex items-center gap-4 md:gap-5 text-zinc-400 relative">
                
                <Phone size={18} md:size={19} strokeWidth={1.5} className="cursor-pointer hover:text-white transition" />
                <Video size={20} md:size={21} strokeWidth={1.5} className="cursor-pointer hover:text-white transition" />

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center justify-center p-1 hover:bg-zinc-900 rounded-full transition"
                    >
                        <MoreVertical size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white" />
                    </button>

                    {showMenu && (
                        <>
                            <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)}></div>
                            <div className="absolute right-0 mt-3 w-52 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl z-40 overflow-hidden py-1">
                                <button
                                    onClick={() => { onOpenInfo(); setShowMenu(false); }}
                                    className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-900 flex items-center gap-3 text-zinc-300 transition"
                                >
                                    <Info size={16} /> {chat.groupChat ? "Group Info" : "User Info"}
                                </button>

                                {chat.groupChat && (
                                    <button onClick={() => { onAddMember(); setShowMenu(false); }} className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-900 flex items-center gap-3 text-zinc-300">
                                        <UserPlus size={16} /> Add Member
                                    </button>
                                )}

                                <button className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-900 flex items-center gap-3 text-red-500 border-t border-zinc-900">
                                    <LogOut size={16} /> {chat.groupChat ? "Exit Group" : "Delete Chat"}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ChatHeader;