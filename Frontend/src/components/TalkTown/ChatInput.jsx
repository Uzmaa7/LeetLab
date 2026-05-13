



import React, { useState } from 'react'; 
import { Paperclip, SendHorizontal, Smile, Loader2 } from 'lucide-react';
import { api } from '../../services/api.services';
import { useSocket } from '../../contexts/SocketContext';

const ChatInput = ({ chatId, onMessageSent, chatMembers }) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { socket } = useSocket();

    const handleSend = async (e) => {
        e.preventDefault();
        
       
        if (!message.trim() || loading) return;

        setLoading(true);
        try {
            // Backend endpoint 
            const response = await api.post("/chats/message", {
                chatId,
                content: message.trim()
            });

            // console.log("Send Message Response:", response);

            if (response.data.success) {

                const messageData = response.data.data;

                // console.log("Sending Message via Socket:", messageData);

                if (socket) {
                    socket.emit("NEW_MESSAGE_SENT", {
                        chatId,
                        message: messageData, 
                        members: chatMembers 
                    });
                }

               

                setMessage(""); // Input clear
                if (onMessageSent) onMessageSent(messageData);
            }
        } catch (err) {
            console.error("Failed to send message:", err);
            alert(err.response?.data?.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2 md:p-4 bg-black border-t border-zinc-900">
            <form 
                onSubmit={handleSend} 
                className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-2 px-4 focus-within:border-zinc-700 transition"
            >
                {/* Attachments Button */}
                <button 
                    type="button"
                    className="text-zinc-500 hover:text-zinc-200 transition"
                >
                    <Paperclip size={22} strokeWidth={1.5} />
                </button>
                
                {/* Input Field */}
                <input 
                    type="text" 
                    placeholder="Message..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-zinc-200"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                
                <div className="flex items-center gap-4">
                    {/* Emoji Button */}
                    <Smile 
                        size={20} 
                        md:size={22}
                        strokeWidth={1.5} 
                        className=" sm:block text-zinc-500 cursor-pointer hover:text-yellow-500 transition" 
                    />
                    
                    {/* Send Button */}
                    <button 
                        type="submit"
                        disabled={!message.trim() || loading}
                        className="text-blue-500 hover:text-blue-400 font-bold flex items-center justify-center p-1 rounded-full transition disabled:text-zinc-700"
                    >
                        {loading ? (
                            <Loader2 size={22} className="animate-spin" />
                        ) : (
                            <SendHorizontal size={22} strokeWidth={1.5} />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;