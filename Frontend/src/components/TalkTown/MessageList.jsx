// import React, { useEffect, useRef } from 'react';

// import { useUserContext } from '../../contexts/UserContext';
// import { Trash2 } from 'lucide-react';
// import { deleteMessageService } from '../../services/chat.service';
// import { useChat } from '../../contexts/ChatContext';


// const MessageList = ({ messages, onMessageDeleted }) => {
//     const { user: currentUser } = useUserContext();
//     const bottomRef = useRef(null);

//     const { activeChat } = useChat();

   

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: 'auto' });
//     }, [messages]);


//     const handleDelete = async (msgId) => {
//         console.log("Deleting ID:", msgId);
//         if (!window.confirm("Delete this message?")) return;

//         try {
//             const res = await deleteMessageService(msgId);
//             console.log("Delete response:", res);
//             if (res.success) {
//                 onMessageDeleted();
//             }
//         } catch (err) {
//             console.error("Delete error", err);
//         }
//     };

//     // return (
//     //     <div className="flex flex-col gap-4 overflow-x-hidden min-h-full">
//     //         {messages.map((msg, index) => {
//     //             const isMe = msg.sender?._id === currentUser?._id;

//     //             return (

//     //                <div 
//     //         key={msg._id || `temp-${index}`} 
//     //         className={`group flex flex-col gap-1 max-w-[75%] ${isMe ? 'ml-auto items-end' : 'items-start'}`}
//     //     >
//     //                     <div className={`flex items-center gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>

//     //                         {/* Message Bubble */}
//     //                         <div className={`p-3 rounded-2xl text-[14px] shadow-sm ${
//     //                             isMe 
//     //                             ? 'bg-blue-600 text-white rounded-tr-none' 
//     //                             : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
//     //                         }`}>
//     //                             {msg.content}
//     //                         </div>

//     //                         {/* Delete Button */}
//     //                         {isMe && (
//     //                             <div className="flex items-center self-end mb-1">
//     //                                 {msg.status === 'seen' ? (
//     //                                     <span className="text-blue-400 text-[10px] font-bold" title="Seen">✓✓</span>
//     //                                 ) : (
//     //                                     <span className="text-zinc-500 text-[10px] font-bold" title="Sent">✓✓</span>
//     //                                 )}
//     //                             </div>
//     //                         )}

//     //                         {/* Delete Button */}
//     //                         {isMe && (
//     //                             <button 
//     //                                 onClick={() => handleDelete(msg._id)}
//     //                                 className="opacity-0 group-hover:opacity-100 transition-all p-2 bg-zinc-900/50 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 rounded-full"
//     //                                 title="Delete"
//     //                             >
//     //                                 <Trash2 size={14} />
//     //                             </button>
//     //                         )}
//     //                     </div>

//     //                     <span className="text-[9px] text-zinc-600 uppercase px-1">
//     //                         {msg.createdAt 
//     //                             ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
//     //                             : "Just now"}
//     //                     </span>
//     //                 </div>
//     //             );
//     //         })}
//     //         <div ref={bottomRef} className='h-2'/>
//     //     </div>
//     // );


//     // MessageList.jsx ka return block

//     // return (
//     //     <div className="flex flex-col gap-4 overflow-x-hidden min-h-full">
//     //         {messages.map((msg, index) => {
//     //             const isMe = msg.sender?._id === currentUser?._id;
//     //             // CHECK: Kya ye list ka sabse aakhiri message hai?
//     //             const isLatest = index === messages.length - 1;

//     //             return (
//     //                 <div 
//     //                     key={msg._id || `temp-${index}`} 
//     //                     className={`group flex flex-col gap-1 max-w-[75%] ${isMe ? 'ml-auto items-end' : 'items-start'}`}
//     //                 >
//     //                     <div className={`flex items-center gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>

//     //                         {/* Message Bubble */}
//     //                         <div className={`p-3 rounded-2xl text-[14px] shadow-sm ${
//     //                             isMe 
//     //                             ? 'bg-blue-600 text-white rounded-tr-none' 
//     //                             : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
//     //                         }`}>
//     //                             {msg.content}
//     //                         </div>

//     //                         {/* TICKS: Sirf mere (Sender) messages par aur sirf Latest message par */}
//     //                         {isMe && isLatest && !activeChat?.groupChat && (
//     //                             <div className="flex items-center self-end mb-1">
//     //                                 {msg.status === 'seen' ? (
//     //                                     <span className="text-blue-400 text-[10px] font-bold" title="Seen">✓✓</span>
//     //                                 ) : (
//     //                                     <span className="text-zinc-500 text-[10px] font-bold" title="Sent">✓✓</span>
//     //                                 )}
//     //                             </div>
//     //                         )}

//     //                         {/* Delete Button */}
//     //                         {isMe && (
//     //                             <button 
//     //                                 onClick={() => handleDelete(msg._id)}
//     //                                 className="opacity-0 group-hover:opacity-100 transition-all p-2 bg-zinc-900/50 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 rounded-full"
//     //                                 title="Delete"
//     //                             >
//     //                                 <Trash2 size={14} />
//     //                             </button>
//     //                         )}
//     //                     </div>

//     //                     <span className="text-[9px] text-zinc-600 uppercase px-1">
//     //                         {msg.createdAt 
//     //                             ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
//     //                             : "Just now"}
//     //                     </span>
//     //                 </div>
//     //             );
//     //         })}
//     //         <div ref={bottomRef} className='h-2'/>
//     //     </div>
//     // );

//     // MessageList.jsx ka return block

//     return (
//         <div className="flex flex-col gap-4 overflow-x-hidden min-h-full">
//             {messages.map((msg, index) => {
//                 const isMe = msg.sender?._id === currentUser?._id;
//     const isLatest = index === messages.length - 1;


//                 return (
//                     <div
//                         key={msg._id || `temp-${index}`}
//                         className={`group flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${isMe ? 'ml-auto items-end' : 'items-start'}`}
//                     >
//                         <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>

//                             {/* Message Bubble */}
//                             <div className={`relative p-3 rounded-2xl text-[14px] shadow-sm flex flex-col gap-1 ${isMe
//                                     ? 'bg-blue-600 text-white rounded-tr-none'
//                                     : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
//                                 }`}>

//                                 {/* Message Content */}
//                                 <span>{msg.content}</span>

//                                 {/* Status Section: Time + Ticks inside the box */}
//                                 <div className="flex items-center justify-end gap-1 self-end mt-1">
//                                     <span className={`text-[9px] uppercase ${isMe ? 'text-blue-100/70' : 'text-zinc-500'}`}>
//                                         {msg.createdAt
//                                             ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//                                             : "Just now"}
//                                     </span>

//                                     {/* TICKS & SEEN TEXT: Sirf mere (Sender) messages par aur sirf Latest message par */}
//                                     {isMe && isLatest && !activeChat?.groupChat && (
//                                         <div className="flex items-center gap-1 ml-1">
//                                             {msg.status === 'seen' ? (
//                                                 <>
//                                                     <span className="text-[9px] font-medium text-blue-200 italic opacity-80">seen</span>
//                                                     <span className="text-blue-300 text-[10px] font-bold">✓✓</span>
//                                                 </>
//                                             ) : (
//                                                 <span className="text-blue-200/40 text-[10px] font-bold">✓✓</span>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Delete Button (Box ke bahar hi rakha hai taaki layout clean rahe) */}
//                             {isMe && (
//                                 <button
//                                     onClick={() => handleDelete(msg._id)}
//                                     className="opacity-0 group-hover:opacity-100 transition-all p-2 bg-zinc-900/50 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 rounded-full"
//                                 >
//                                     <Trash2 size={14} />
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 );
//             })}
//             <div ref={bottomRef} className='h-2' />
//         </div>
//     );

// };

// export default MessageList;






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
                // Variables loop ke andar hone chahiye
                const isMe = msg.sender?._id === currentUser?._id;
                const isLatest = index === messages.length - 1;

                return (
                    <div
                        key={msg._id || `temp-${index}`}
                        className={`group flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${isMe ? 'ml-auto items-end' : 'items-start'}`}
                    >
                        <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* Message Bubble */}
                            <div className={`relative p-3 rounded-2xl text-[14px] shadow-sm flex flex-col gap-1 ${isMe
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-800'
                                }`}>

                                {/* Message Content */}
                                <span>{msg.content}</span>

                                {/* Status Section: Time + Ticks */}
                                <div className="flex items-center justify-end gap-1 self-end mt-1">
                                    <span className={`text-[9px] uppercase ${isMe ? 'text-blue-100/70' : 'text-zinc-500'}`}>
                                        {msg.createdAt
                                            ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : "Just now"}
                                    </span>

                                    {/* TICKS & SEEN TEXT: Sirf Latest message par */}
                                    {isMe && isLatest && !activeChat?.groupChat && (
                                        <div className="flex items-center gap-1 ml-1">
                                            {msg.status === 'seen' ? (
                                                <>
                                                    {/* White color ticks and seen text as requested */}
                                                    <span className="text-[9px] font-medium text-white italic opacity-90">seen</span>
                                                    <span className="text-white text-[10px] font-bold">✓✓</span>
                                                </>
                                            ) : (
                                                <span className="text-white/40 text-[10px] font-bold">✓✓</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Delete Button */}
                            {isMe && (
                                <button
                                    onClick={() => handleDelete(msg._id)}
                                    className="opacity-0 group-hover:opacity-100 transition-all p-2 bg-zinc-900/50 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 rounded-full"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} className='h-2' />
        </div>
    );
};

export default MessageList;