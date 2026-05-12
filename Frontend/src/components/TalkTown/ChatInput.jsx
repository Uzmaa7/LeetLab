



import React, { useState } from 'react'; 
import { Paperclip, SendHorizontal, Smile, Loader2 } from 'lucide-react';
import { api } from '../../services/api.services';

const ChatInput = ({ chatId, onMessageSent }) => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        
       
        if (!message.trim() || loading) return;

        setLoading(true);
        try {
            // Backend endpoint jo humne abhi banaya: /chats/message
            const response = await api.post("/chats/message", {
                chatId,
                content: message.trim()
            });

            if (response.data.success) {
                setMessage(""); // Input clear karein
                if (onMessageSent) onMessageSent(); // ChatWindow ko trigger karein messages fetch karne ke liye
            }
        } catch (err) {
            console.error("Failed to send message:", err);
            alert(err.response?.data?.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-black border-t border-zinc-900">
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
                    className="flex-1 bg-transparent border-none outline-none text-[14px] py-1 text-zinc-200"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                
                <div className="flex items-center gap-4">
                    {/* Emoji Button */}
                    <Smile 
                        size={22} 
                        strokeWidth={1.5} 
                        className="text-zinc-500 cursor-pointer hover:text-yellow-500 transition" 
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
            
            {/* Branding */}
            <p className="text-[9px] text-center text-zinc-700 mt-2 tracking-widest uppercase">
                Secured by LeetLab
            </p>
        </div>
    );
};

export default ChatInput;