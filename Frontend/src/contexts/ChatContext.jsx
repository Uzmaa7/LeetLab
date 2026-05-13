
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMyChatsService } from '../services/chat.service';

import { useSocket } from './SocketContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessageSidebar = (data) => {
            const { chatId, message } = data;

            setChats((prevChats) => {
                const updatedChats = prevChats.map((chat) => {
                    if (chat._id === chatId) {
                        return {
                            ...chat,
                            latestMessage: message, // 
                            unread: activeChat?._id !== chatId // if the new message is not in the currently active chat, mark it as unread
                        };
                    }
                    return chat;
                });

                // Latest message wale chat ko sabse upar laane ke liye sort karein
                return updatedChats.sort((a, b) =>
                    new Date(b.latestMessage?.createdAt) - new Date(a.latestMessage?.createdAt)
                );
            });
        };

        socket.on("MESSAGE_RECEIVED", handleNewMessageSidebar);
        return () => socket.off("MESSAGE_RECEIVED", handleNewMessageSidebar);
    }, [socket, activeChat?._id]);



    const fetchChats = async () => {
        setLoading(true);
        try {
            const data = await getMyChatsService();
            if (data.success || data.chats) {
                setChats(data.chats);
            }
        } catch (error) {
            console.error("Failed to fetch chats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);





const selectChat = (chat) => {
    setActiveChat(chat);
    if (chat) {
        setChats((prev) =>
            prev.map((c) =>
                c._id === chat._id ? { ...c, unread: false } : c
            )
        );
    }
};

    return (
        <ChatContext.Provider value={{
            chats,
            activeChat,
            setActiveChat: selectChat,
            messages,
            setMessages,
            loading,
            fetchChats
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);