import React, { useEffect, useRef } from 'react';
import { useUserContext } from '../../contexts/UserContext';

const MessageList = ({ messages }) => {
    const { user: currentUser } = useUserContext();
    const bottomRef = useRef(null);

   
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col gap-4">
            {messages.map((msg) => {
                const isMe = msg.sender?._id === currentUser?._id;

                return (
                    <div 
                        key={msg._id} 
                        className={`flex flex-col gap-1 max-w-[75%] ${isMe ? 'ml-auto items-end' : 'items-start'}`}
                    >
                        {/* Sender Name */}
                        {!isMe && msg.sender?.fullname && (
                            <span className="text-[10px] text-zinc-500 font-bold ml-1">
                                {msg.sender.fullname}
                            </span>
                        )}

                        {/* Message Bubble */}
                        <div className={`p-3 rounded-2xl text-[14px] shadow-sm ${
                            isMe 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
                        }`}>
                            {msg.content && <p>{msg.content}</p>}
                            
                            {/* Attachments */}
                            {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mt-2 grid grid-cols-1 gap-2">
                                    {msg.attachments.map((file, i) => (
                                        <img 
                                            key={i} 
                                            src={file.url} 
                                            alt="attachment" 
                                            className="rounded-lg max-h-60 w-full object-cover border border-black/20" 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Timestamp */}
                        <span className="text-[9px] text-zinc-600 uppercase px-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                );
            })}
            
            {/* Scroll Anchor */}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;