import React from 'react';
import { Paperclip, SendHorizontal, Smile } from 'lucide-react';

const ChatInput = () => (
    <div className="p-4 bg-black border-t border-zinc-900">
        <div className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-2 px-4 focus-within:border-zinc-700 transition">
            <button className="text-zinc-500 hover:text-zinc-200">
                <Paperclip size={22} strokeWidth={1.5} />
            </button>
            
            <input 
                type="text" 
                placeholder="Message..." 
                className="flex-1 bg-transparent border-none outline-none text-[14px] py-1 text-zinc-200"
            />
            
            <div className="flex items-center gap-4">

                <Smile size={22} strokeWidth={1.5} className="text-zinc-500 cursor-pointer hover:text-yellow-500 transition" />
                
                <button className="text-blue-500 hover:text-blue-400 font-bold flex items-center justify-center p-1 rounded-full transition">
                    <SendHorizontal size={22} strokeWidth={1.5} />
                </button>
            </div>
        </div>
        <p className="text-[9px] text-center text-zinc-700 mt-2 tracking-widest uppercase">Secured by LeetLab</p>
    </div>
);

export default ChatInput;