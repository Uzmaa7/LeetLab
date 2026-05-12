import React, { useState, useCallback, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import GroupInfoSidebar from './GroupInfoSidebar';
import { useChat } from '../../contexts/ChatContext';
import AddMemberModal from './AddMemberModal';

import { getMessagesService } from '../../services/chat.service';

const ChatWindow = ({ activeChat }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const { setActiveChat, fetchChats } = useChat();

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([]); // Messages state


    // 1. Fetch Messages Function
    const fetchMessages = useCallback(async () => {
        if (!activeChat?._id) return;
        
        setLoading(true);
        try {
            // Page 1 fetch kar rahe hain abhi ke liye
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
        // Jab chat change ho to sidebar band kar dena better UX hai
        setIsSidebarOpen(false); 
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
                        <MessageList messages={messages} />
                    )}
                </div>

               {/* ChatInput ko fetchMessages pass kar rahe hain taki message bhejte hi list refresh ho */}
                <ChatInput 
                    chatId={activeChat._id} 
                    onMessageSent={fetchMessages} 
                />



            </div>

            {/* Group Info Sidebar */}
            {isSidebarOpen && (
                <GroupInfoSidebar
                    chatId={activeChat._id}
                    onClose={() => setIsSidebarOpen(false)}
                    onDeleteSuccess={() => { 
                        setActiveChat(null);
                        fetchChats();
                    }}
                />
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