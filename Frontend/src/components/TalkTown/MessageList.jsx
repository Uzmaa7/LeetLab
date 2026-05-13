import React, { useEffect, useRef } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { Trash2 } from 'lucide-react'; 
import { deleteMessageService } from '../../services/chat.service';

const MessageList = ({ messages, onMessageDeleted }) => {
    const { user: currentUser } = useUserContext();
    const bottomRef = useRef(null);



   
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);


    const handleDelete = async (msgId) => {
        console.log("Deleting ID:", msgId);
        if (!window.confirm("Delete this message?")) return;
       
        try {
            const res = await deleteMessageService(msgId);
            console.log("Delete response:", res);
            if (res.success) {
                onMessageDeleted(); 
            }
        } catch (err) {
            console.error("Delete error", err);
        }
    };

    return (
        <div className="flex flex-col gap-4 overflow-x-hidden min-h-full">
            {messages.map((msg, index) => {
                const isMe = msg.sender?._id === currentUser?._id;

                return (
                    
                   <div 
            key={msg._id || `temp-${index}`} 
            className={`group flex flex-col gap-1 max-w-[75%] ${isMe ? 'ml-auto items-end' : 'items-start'}`}
        >
                        <div className={`flex items-center gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                            
                            {/* Message Bubble */}
                            <div className={`p-3 rounded-2xl text-[14px] shadow-sm ${
                                isMe 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
                            }`}>
                                {msg.content}
                            </div>

                            {/* Delete Button */}
                            {isMe && (
                                <button 
                                    onClick={() => handleDelete(msg._id)}
                                    className="opacity-0 group-hover:opacity-100 transition-all p-2 bg-zinc-900/50 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 rounded-full"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>

                        <span className="text-[9px] text-zinc-600 uppercase px-1">
                            {msg.createdAt 
                                ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                                : "Just now"}
                        </span>
                    </div>
                );
            })}
            <div ref={bottomRef} className='h-2'/>
        </div>
    );

};

export default MessageList;