import React, { useState, useEffect, useCallback } from 'react';
import {
    Search, Plus, ExternalLink, Trophy, LayoutGrid, Swords, BarChart3,
    X, Link as LinkIcon, Tag, ChevronDown, Microscope, Layers, Flame, ChevronUp,
    CheckCircle2, Edit3, Trash2, Square, CheckSquare, FolderPlus, Laptop, Sparkles, CloudMoon
} from 'lucide-react';




import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { LeetButton } from "../index.jsx"


const QuestionTable = ({ 
    filteredQuestions, 
    selectedIds, 
    handleCheckboxChange, 
    openEditModal, 
    handleDelete 
}) => {
    return (
        <div className="bg-[#18181B] border border-zinc-700 rounded-2xl overflow-hidden shadow-sm">
                       <table className="w-full text-left border-collapse">
                           <thead className="bg-black/20 border-b border-zinc-700">
                               <tr>
                                   <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-600 w-16 text-center italic">Status</th>
                                   <th className="px-4 py-4 text-[10px] font-black uppercase text-zinc-600">Title</th>
                                   <th className="px-4 py-4 text-[10px] font-black uppercase text-zinc-600">Tags</th>
                                   <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-zinc-600">Action</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-zinc-700/50">
                               {filteredQuestions.map((q) => (
                                   <motion.tr key={q._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group hover:bg-zinc-900/30 transition-all">
                                       <td className="px-6 py-5 text-center">
                                           <button onClick={() => handleCheckboxChange(q._id)}>
                                               {selectedIds.includes(q._id) ? <CheckSquare size={18} className="mx-auto text-blue-500" /> : <Square size={18} className="mx-auto text-zinc-800" />}
                                           </button>
                                       </td>
                                       <td className="px-4 py-5">
                                           <div className="flex flex-col gap-1">
                                               <span className="font-semibold text-zinc-200">{q.title}</span>
                                               <div className="flex gap-2">
                                                   <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-700/50">{q.platform}</span>
                                                   <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${q.difficulty === 'easy' ? 'text-emerald-500 border-emerald-900/50 bg-emerald-950/20' : q.difficulty === 'medium' ? 'text-amber-500 border-amber-900/50 bg-amber-950/20' : 'text-rose-500 border-rose-900/50 bg-rose-950/20'}`}>{q.difficulty}</span>
                                               </div>
                                           </div>
                                       </td>
                                       <td className="px-4 py-6">
                                           <div className="flex flex-wrap gap-2">
                                               {q.topics?.map(t => <span key={t} className="text-[10px] font-bold text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/50">{t.toLowerCase()}</span>)}
                                           </div>
                                       </td>
                                       <td className="px-6 py-5">
                                           <div className="flex items-center justify-end gap-2">
                                               <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                   <button  onClick={() => openEditModal(q)} className="p-1.5 text-zinc-500 hover:text-white"><Edit3 size={14} /></button>
                                                   <button onClick={() => handleDelete(q._id)} className="p-1.5 text-zinc-500 hover:text-rose-500"><Trash2 size={14} /></button>
                                               </div>
                                               <a href={q.questionUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 hover:bg-blue-600 transition-all"><ExternalLink size={16} /></a>
                                           </div>
                                       </td>
                                   </motion.tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
    );
};

export default QuestionTable;