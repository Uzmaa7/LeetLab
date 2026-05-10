
import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { UserPlus } from 'lucide-react';
import ChatWindow from './ChatWindow';

import CreateGroupModal from './CreateGroupModal';

const DirectMessages = () => {
    const { chats, loading, activeChat, setActiveChat } = useChat();

    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    if (loading) return <div className="text-white p-10">Loading Chats...</div>;

    return (
        <div className="flex w-full h-screen bg-black overflow-hidden border-l border-zinc-800">
            {/* Left Column: Chat List */}
            <div className="w-full md:w-80 lg:w-[350px] border-r border-zinc-800 flex flex-col">
                {/* Header Section with New Group Icon */}
                <div className="p-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white tracking-tight">Messages</h2>
                    
                    {/*  New Group Icon */}
                    <button 
                        onClick={() => setIsGroupModalOpen(true)}
                        className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
                        title="New Group"
                    >
                        <UserPlus size={22} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2">
                    {chats.length > 0 ? chats.map((chat) => (
                        <div 
                            key={chat._id}
                            onClick={() => setActiveChat(chat)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all mb-1
                                ${activeChat?._id === chat._id ? 'bg-zinc-900' : 'hover:bg-zinc-950 text-zinc-400 hover:text-white'}`}
                        >
                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold border border-zinc-700">
                                {chat.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                                   
                                </div>
                                <p className="text-xs text-zinc-500 truncate mt-0.5">
                                    {chat.groupChat ? "Group Chat" : "Private Message"}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-zinc-600 text-center text-sm mt-10 px-4">No chats found. Use search to find friends!</p>
                    )}
                </div>
            </div>

            {/* Right Column */}
            <div className="hidden md:flex flex-1 flex-col">
                {activeChat ? (
                    <ChatWindow activeChat={activeChat} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-zinc-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>


            {/* Create Group Modal Render */}
            {isGroupModalOpen && (
                <CreateGroupModal onClose={() => setIsGroupModalOpen(false)} />
            )}


        </div>
    );
};

export default DirectMessages;