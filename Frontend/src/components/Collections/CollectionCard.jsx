import React from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, Edit3, Trash2, Lock, Globe, ChevronRight } from 'lucide-react';

const CollectionCard = ({ col, onEdit, onDelete, onView }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-[#18181B] border border-zinc-800 p-6 rounded-3xl hover:border-orange-500/40 transition-all shadow-xl relative overflow-hidden"
        >
            {/* Background subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start relative z-10">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <FolderPlus size={24} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                        onClick={() => onEdit(col)} 
                        className="p-2 text-zinc-500 hover:text-white bg-black/40 rounded-xl transition-colors"
                    >
                        <Edit3 size={14} />
                    </button>
                    <button 
                        onClick={() => onDelete(col._id)} 
                        className="p-2 text-zinc-500 hover:text-rose-500 bg-black/40 rounded-xl transition-colors"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div className="mt-6 relative z-10">
                <h3 className="text-lg font-black text-white uppercase tracking-tight truncate">
                    {col.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-2 line-clamp-2 h-8 font-medium leading-relaxed">
                    {col.description || "Organize your problems for easy practice."}
                </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        {col.questionsCount || 0} Questions
                    </span>
                    {col.isPrivate ? (
                        <Lock size={14} className="text-zinc-600" />
                    ) : (
                        <Globe size={14} className="text-emerald-500/40" />
                    )}
                </div>
                <button
                    onClick={() => onView(col._id)}
                    className="flex items-center gap-1 text-[10px] font-black text-orange-500 hover:text-orange-400 transition-colors"
                >
                    View Full <ChevronRight size={12} />
                </button>
            </div>
        </motion.div>
    );
};

export default CollectionCard;