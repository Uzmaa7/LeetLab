import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';

const ChatHeader = ({ name }) => (
    <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-black/50 backdrop-blur-md">

        <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-700">
                {name[0]}
            </div>

            <div>
                <h3 className="font-semibold text-sm">{name}</h3>
                <span className="text-[10px] text-green-500 font-medium italic">Online</span>
            </div>

        </div>
        
        <div className="flex items-center gap-5 text-zinc-400">
            <Phone size={19} strokeWidth={1.5} className="cursor-pointer hover:text-white transition" />
            <Video size={21} strokeWidth={1.5} className="cursor-pointer hover:text-white transition" />
            <MoreVertical size={20} strokeWidth={1.5} className="cursor-pointer hover:text-white transition" />
        </div>
    </div>
);

export default ChatHeader;