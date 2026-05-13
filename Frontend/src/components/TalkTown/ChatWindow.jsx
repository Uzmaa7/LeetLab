import React, { useState, useCallback, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import GroupInfoSidebar from './GroupInfoSidebar';
import { useChat } from '../../contexts/ChatContext';
import AddMemberModal from './AddMemberModal';

import { getMessagesService } from '../../services/chat.service';

import { useSocket } from '../../contexts/SocketContext';

const ChatWindow = ({ activeChat }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const { setActiveChat, fetchChats } = useChat();

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([]); // Messages state

    const { socket } = useSocket();

    // --- NAYA FUNCTION: Sirf ek message add karne ke liye ---
    const handleLocalAppend = useCallback((newMsg) => {
        setMessages((prev) => {
            // Check taaki duplicate na ho (socket aur API dono se aa sakta hai)
            const exists = prev.find(m => m._id === newMsg._id);
            if (exists) return prev;
            return [...prev, newMsg];
        });
    }, []);


    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (data) => {
            // if the new message belongs to the currently active chat, add it to the messages list
            if (data.chatId === activeChat?._id) {
                // add the new message to the list
                setMessages((prev) => [...prev, data.message]);
            }
        };

        socket.on("MESSAGE_RECEIVED", handleNewMessage);

        return () => {
            socket.off("MESSAGE_RECEIVED", handleNewMessage);
        };
    }, [socket, activeChat?._id]);


    // 1. Fetch Messages
    const fetchMessages = useCallback(async () => {
        if (!activeChat?._id) return;
        
        // Sirf tab loading dikhayein jab messages khali hon
        if (messages.length === 0) setLoading(true);

        try {
            // Page 1 fetch for now
            const data = await getMessagesService(activeChat._id, 1);
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (err) {
            console.error("Error fetching messages:", err);
        } finally {
            setLoading(false);
        }
    }, [activeChat?._id]);

    // 2. Load messages when activeChat changes
    useEffect(() => {
        fetchMessages();
        // when we switch to a different chat, we should also close the sidebar and add member modal (if open)
        setIsSidebarOpen(false); 
        setIsAddMemberOpen(false);
    }, [fetchMessages]);


    return (
        <div className="flex h-full bg-black relative overflow-hidden">
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-0 lg:mr-80' : ''}`}>
                <ChatHeader
                    chat={activeChat}
                    onOpenInfo={() => setIsSidebarOpen(!isSidebarOpen)}
                    onAddMember={() => setIsAddMemberOpen(true)} 
                />


                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="h-full flex items-center justify-center text-zinc-500 text-sm italic">
                            Loading conversation...
                        </div>
                    ) : (
                        <MessageList messages={messages} onMessageDeleted={fetchMessages} />
                    )}
                </div>

               {/* ChatInput  */}
                <ChatInput 
                    chatId={activeChat._id} 
                    onMessageSent={handleLocalAppend}
                    chatMembers={activeChat.members}
                />



            </div>

            

            {/* Group Info Sidebar - Mobile - full-screen/slide-over style */}
            {isSidebarOpen && (
                <div className="fixed inset-0 lg:relative lg:inset-auto z-40 lg:z-10 flex">
                    {/* Backdrop for Mobile */}
                    <div 
                        className="absolute inset-0 bg-black/60 lg:hidden" 
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    
                    {/* Actual Sidebar Content */}
                    <div className="ml-auto w-[85%] sm:w-[320px] lg:w-80 h-full bg-zinc-950 border-l border-zinc-800 z-50">
                        <GroupInfoSidebar
                            chatId={activeChat._id}
                            onClose={() => setIsSidebarOpen(false)}
                            onDeleteSuccess={() => { 
                                setActiveChat(null);
                                fetchChats();
                            }}
                        />
                    </div>
                </div>
            )}

            {isAddMemberOpen && (
                <AddMemberModal
                    chatId={activeChat._id}
                    onClose={() => setIsAddMemberOpen(false)}
                />
            )}

        </div>
    );

    
};

export default ChatWindow;