import React, { useState, useCallback, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import GroupInfoSidebar from './GroupInfoSidebar';
import { useChat } from '../../contexts/ChatContext';
import AddMemberModal from './AddMemberModal';

import { getMessagesService } from '../../services/chat.service';

import { useSocket } from '../../contexts/SocketContext';
import { useUserContext } from '../../contexts/UserContext';

const ChatWindow = ({ activeChat }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const { setActiveChat, fetchChats } = useChat();

    const { user: currentUser } = useUserContext();

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([]); 
    const { socket } = useSocket();

    useEffect(() => {
    // Agar chat 1-on-1 hai aur usme messages hain
    if (socket && activeChat && !activeChat.groupChat && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];

        // if the last message is from the other user and not yet seen, mark it as read
        if (lastMessage.sender?._id !== currentUser?._id) {
            socket.emit("MARK_AS_READ", {
                chatId: activeChat._id,
                senderId: lastMessage.sender?._id,
                userId: currentUser?._id
            });
        }
    }
}, [activeChat, messages, messages.length, socket, currentUser?._id]);



    // Socket listener for new messages in the active chat
    const handleLocalAppend = useCallback((newMsg) => {
        setMessages((prev) => {
            //check so that we don't add duplicate messages when we receive the same message via socket that we just sent
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




const handleStatusUpdate = useCallback((data) => {
    if (data.chatId === activeChat?._id) {
        setMessages((prev) => 
            prev.map((msg) => ({
                ...msg,
                status: 'seen' // mark all messages as seen for simplicity, ideally we should only update the relevant message(s) based on data from backend
            }))
        );
    }
}, [activeChat?._id]);

useEffect(() => {
    if (!socket) return;
    socket.on("MESSAGE_SEEN_UPDATE", handleStatusUpdate);
    return () => socket.off("MESSAGE_SEEN_UPDATE", handleStatusUpdate);
}, [socket, handleStatusUpdate]);


    // 1. Fetch Messages
    const fetchMessages = useCallback(async () => {
        if (!activeChat?._id) return;
        
        // only show loading state if we don't have any messages yet, so that we don't show loading spinner every time we switch between chats after the first load
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