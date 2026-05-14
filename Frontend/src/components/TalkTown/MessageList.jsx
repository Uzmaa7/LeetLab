





import React, { useEffect, useRef } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { Trash2 } from 'lucide-react';
import { deleteMessageService } from '../../services/chat.service';
import { useChat } from '../../contexts/ChatContext';

const MessageList = ({ messages, onMessageDeleted }) => {
    const { user: currentUser } = useUserContext();
    const bottomRef = useRef(null);
    const { activeChat } = useChat();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    const handleDelete = async (msgId) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            const res = await deleteMessageService(msgId);
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
                // 1.  (SYSTEM MESSAGE)
                if (msg.messageType === 'notification') {
                    return (
                        <div key={msg._id || index} className="flex justify-center my-2 w-full">
                            <div className="bg-zinc-800/40 border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
                                <p className="text-[10px] sm:text-[11px] text-zinc-400 font-medium italic text-center">
                                    {msg.content}
                                </p>
                            </div>
                        </div>
                    );
                }

                // 2. for normal messages
                const isMe = msg.sender?._id === currentUser?._id;
                const isLatest = index === messages.length - 1;
                const isGroup = activeChat?.groupChat;

                return (
                    <div key={msg._id || `temp-${index}`} className={`group flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${isMe ? 'ml-auto items-end' : 'items-start'}`} >

                        {/* 1. in group chat show sender name */}
                        {!isMe && isGroup && (
                            <span className="text-[10px] text-zinc-500 font-bold ml-12 mb-0.5">
                                {msg.sender?.fullname}
                            </span>
                        )}


                        <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>




                            {!isMe && isGroup && (
                                <img
                                    // fetch the url from sender.avatar, if it's an object get url property, otherwise use it directly (for backward compatibility)
                                    src={msg.sender?.avatar?.url || msg.sender?.avatar || "/default-avatar.png"}
                                    className="w-8 h-8 rounded-full border border-zinc-800 object-cover mb-1"
                                    alt="avatar"
                                    // for backup if avatar fails to load, show default avatar
                                    onError={(e) => { e.target.src = "/default-avatar.png" }}
                                />
                            )}


                            {/* Bubble logic... */}
                            <div className={`relative p-3 rounded-2xl text-[14px] shadow-sm flex flex-col gap-1 ${isMe
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
                                }`}>
                                <span>{msg.content}</span>
                                <div className="flex items-center justify-end gap-1 self-end mt-1">
                                    <span className={`text-[9px] uppercase ${isMe ? 'text-blue-100/70' : 'text-zinc-500'}`}>
                                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                                    </span>
                                    {isMe && isLatest && !activeChat?.groupChat && (
                                        <div className="flex items-center gap-1 ml-1">
                                            {msg.status === 'seen' ? (
                                                <><span className="text-[9px] font-medium text-white italic opacity-90">seen</span><span className="text-white text-[10px] font-bold">✓✓</span></>
                                            ) : (
                                                <span className="text-white/40 text-[10px] font-bold">✓✓</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} className='h-2' />
        </div>
    );
};

export default MessageList;