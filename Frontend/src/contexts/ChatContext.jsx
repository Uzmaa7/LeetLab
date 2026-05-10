
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMyChatsService } from '../services/chat.service';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <ChatContext.Provider value={{ 
            chats, 
            activeChat, 
            setActiveChat, 
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