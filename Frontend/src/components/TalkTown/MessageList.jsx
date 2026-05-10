import React from 'react';

const MessageList = () => {
    const dummyMessages = [
        { id: 1, text: "Hey! Let's discuss the Judge0 issue.", sender: "other", time: "10:45 AM" },
        { id: 2, text: "Sure, I fixed the API route for code execution.", sender: "me", time: "10:46 AM" },
    ];

    return (
        <div className="flex flex-col gap-4">

            {dummyMessages.map((msg) => (

                <div key={msg.id} className={`flex flex-col gap-1 max-w-[75%] ${msg.sender === 'me' ? 'ml-auto items-end' : 'items-start'}`}>

                    <div className={`p-3 rounded-2xl text-[14px] leading-relaxed ${
                        msg.sender === 'me' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-zinc-900 text-zinc-200 rounded-tl-none'
                    }`}>

                        {msg.text}

                    </div>
                    
                    <div className="flex items-center gap-1 px-1">
                        <span className="text-[10px] text-zinc-500 uppercase">{msg.time}</span>
                        {msg.sender === 'me' && <span className="text-[10px] text-blue-500 font-bold">✓✓</span>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;