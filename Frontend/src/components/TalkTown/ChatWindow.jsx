import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import GroupInfoSidebar from './GroupInfoSidebar';
import { useChat } from '../../contexts/ChatContext';
import AddMemberModal from './AddMemberModal';

const ChatWindow = ({ activeChat }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const { setActiveChat, fetchChats } = useChat();

    return (
        <div className="flex h-full bg-black relative overflow-hidden">
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-0 lg:mr-80' : ''}`}>
                <ChatHeader
                    chat={activeChat}
                    onOpenInfo={() => setIsSidebarOpen(!isSidebarOpen)}
                    onAddMember={() => setIsAddMemberOpen(true)} 
                />


                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <MessageList chatId={activeChat._id} />
                </div>

                <ChatInput chatId={activeChat._id} />



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