import React from 'react';
import { Plus } from 'lucide-react';

const LeetButton = ({ 
    onClick, 
    text = "Add Question", 
    icon: Icon = Plus, 
    className = "" 
}) => {
    return (
        <button 
            onClick={onClick}
            className={`group relative flex items-center gap-2 px-6 py-2.5 bg-zinc-900 border border-zinc-700 hover:border-orange-500/50 rounded-xl transition-all duration-300 shadow-2xl shadow-black ${className}`}
        >
            {/* Hover Glow Effect Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
            
            {/* Icon with Animation */}
            {Icon && (
                <Icon 
                    size={14} 
                    className="text-orange-500 group-hover:scale-110 transition-transform duration-300 relative z-10" 
                />
            )}
            
            {/* Button Text */}
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300 group-hover:text-white transition-colors relative z-10">
                {text}
            </span>

            {/* Bottom subtle accent line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-orange-500 group-hover:w-1/2 transition-all duration-500" />
        </button>
    );
};

export default LeetButton;