import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { LeetButton } from '../index.jsx';

const CollectionModal = ({
    isOpen,
    onClose,
    editingId,
    formData,
    setFormData,
    handleSubmit
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                        <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                        {editingId ? 'Update' : 'New'} Collection
                    </h3>
                    <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-zinc-600 ml-1">Collection Name</label>
                        <input required maxLength={50} className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-xs text-white focus:border-orange-500/50 outline-none transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Dynamic Programming" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-zinc-600 ml-1">Description (Optional)</label>
                        <textarea maxLength={100} rows="3" className="w-full bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl text-xs text-white resize-none focus:border-orange-500/50 outline-none transition-all" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Target: Interview prep for FAANG..." />
                    </div>

                    <label className="flex items-center gap-3 p-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl cursor-pointer hover:bg-zinc-900/50 transition-all">
                        <input type="checkbox" className="w-4 h-4 accent-orange-600 rounded-md" checked={formData.isPrivate} onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-wider">Private Collection</span>
                            <span className="text-[9px] text-zinc-600 font-bold">Only you can view this</span>
                        </div>
                    </label>

                    <div className="pt-4">
                        <LeetButton type="submit" text={editingId ? 'Save Changes' : 'Create Collection'} className="w-full justify-center py-4" />
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CollectionModal;