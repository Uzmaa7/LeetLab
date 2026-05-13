



import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { UserPlus, ArrowLeft } from 'lucide-react';
import ChatWindow from './ChatWindow';
import CreateGroupModal from './CreateGroupModal';

const DirectMessages = () => {
    const { chats, loading, activeChat, setActiveChat } = useChat();
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    if (loading) return <div className="text-white p-10">Loading Chats...</div>;

    return (
        <div className="flex w-full h-screen bg-black overflow-hidden border-l border-zinc-800 relative">

            {/* Left Column: Chat List */}
            {/* Mobile logic: Agar activeChat hai toh list ko hide 'hidden' kar do, warna 'flex' rakho */}
            <div className={`${activeChat ? 'hidden' : 'flex'} md:flex w-full md:w-80 lg:w-[350px] border-r border-zinc-800 flex-col h-full bg-black`}>

                {/* Header */}
                <div className="p-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white tracking-tight">Messages</h2>
                    <button
                        onClick={() => setIsGroupModalOpen(true)}
                        className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 hover:text-white transition-colors"
                    >
                        <UserPlus size={22} strokeWidth={1.5} />
                    </button>
                </div>

                {/* List Container */}
                <div className="flex-1 overflow-y-auto px-2 pb-20 md:pb-0">
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
                                <h3 className="font-semibold text-sm truncate text-white">{chat.name}</h3>
                                <p className={`text-xs truncate mt-0.5 ${chat.unread ? 'text-blue-400 font-bold' : 'text-zinc-500'}`}>
                                    {chat.latestMessage?.content || (chat.groupChat ? "Group Chat" : "Private Message")}
                                </p>
                            </div>

                        </div>
                    )) : (
                        <p className="text-zinc-600 text-center text-sm mt-10 px-4">No chats found.</p>
                    )}
                </div>
            </div>

            {/* Right Column: Chat Window */}
            {/* Mobile logic: Agar activeChat hai toh hi ye column dikhe 'flex', warna 'hidden' */}
            <div className={`${activeChat ? 'flex' : 'hidden'} md:flex flex-1 flex-col h-full bg-black`}>
                {activeChat ? (
                    <div className="flex-1 flex flex-col h-full relative">
                        {/* Mobile specific back button (WhatsApp style) */}
                        <div className="md:hidden absolute top-4 left-4 z-50">
                            <button
                                onClick={() => setActiveChat(null)}
                                className="p-2 bg-zinc-900 rounded-full text-white"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        </div>
                        <ChatWindow activeChat={activeChat} />
                    </div>
                ) : (
                    <div className="hidden md:flex flex-col items-center justify-center h-full">
                        <p className="text-zinc-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>

            {isGroupModalOpen && <CreateGroupModal onClose={() => setIsGroupModalOpen(false)} />}
        </div>
    );
};

export default DirectMessages;