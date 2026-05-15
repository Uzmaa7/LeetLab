import React, { useState, useEffect, useCallback } from 'react';
import {
    Search, Plus, ExternalLink, Trophy, LayoutGrid, Swords, BarChart3,
    X, Link as LinkIcon, Tag, ChevronDown, Microscope, Layers, Flame, ChevronUp,
    CheckCircle2, Edit3, Trash2, Square, CheckSquare, FolderPlus, Laptop, Sparkles, CloudMoon
} from 'lucide-react';



import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { LeetButton } from '../index.jsx';



const QuestionModal = ({ 
    isOpen, 
    onClose, 
    editingId, 
    formData, 
    setFormData, 
    handleUploadOrUpdate, 
    submitting 
}) => {
    if (!isOpen) return null;

    return (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md bg-[#18181B] border border-zinc-700 p-6 rounded-2xl shadow-2xl">

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">{editingId ? 'Update' : 'New'} Question</h3>
                                <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={16} /></button>
                            </div>

                            <form onSubmit={handleUploadOrUpdate} className="space-y-4">
                                {/* 1. Title Input */}
                                <input required className="w-full bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none focus:border-orange-500/40" value={formData.title} placeholder="Title (e.g. Two Sum)" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

                                {/* 2. Platform and Difficulty Selectors */}
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-zinc-400 outline-none" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })}>
                                        <option value="leetcode">LeetCode</option>
                                        <option value="gfg">GFG</option>
                                        <option value="codeforces">Codeforces</option>
                                    </select>
                                    <select className="bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-zinc-400 outline-none" value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>

                                {/* 3. URL Input: for Add question only */}
                                {!editingId && <input required type="url" className="w-full bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none" value={formData.questionUrl} placeholder="Question URL" onChange={(e) => setFormData({ ...formData, questionUrl: e.target.value })} />}

                                {/* 4. Topics Input: for Add question only */}
                                {!editingId && <input className="w-full bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none" value={formData.topics} placeholder="Topics (comma separated)" onChange={(e) => setFormData({ ...formData, topics: e.target.value })} /> }

                                {/* 5. Submit Button */}
                                <LeetButton type="submit" disabled={submitting} text={submitting ? "Processing..." : (editingId ? 'Save Changes' : 'Add Question')} icon={editingId ? CheckCircle2 : Plus} className="w-full justify-center" />
                            </form>
                        </motion.div>
                    </div>
    );
};

export default QuestionModal;