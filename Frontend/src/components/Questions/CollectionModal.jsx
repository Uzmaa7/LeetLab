import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { LeetButton } from '../index.jsx';

const CollectionModal = ({
    isOpen,
    onClose,
    selectedIds,
    userCollections,
    selectedCollectionId,
    setSelectedCollectionId,
    handleAddToCollection
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-[#18181B] border border-zinc-700 p-6 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-2">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        Save to Collection
                    </h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X size={16} /></button>
                </div>

                <div className="space-y-4">
                    <div className="px-1 italic">
                        <p className="text-[11px] text-zinc-400 font-bold">Adding <span className="text-orange-500">{selectedIds.length}</span> question(s) to:</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-zinc-600 ml-1">Target Collection</label>


                        <select
                            className="w-full bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-zinc-400 outline-none focus:border-orange-500/40 font-bold transition-all cursor-pointer"
                            value={selectedCollectionId}
                            onChange={(e) => setSelectedCollectionId(e.target.value)}
                        >
                            <option value="">Select a collection...</option>
                            {userCollections && userCollections.length > 0 ? (
                                userCollections.map(col => (
                                    <option key={col._id} value={col._id} className="bg-[#18181B]">
                                        {col.name.toUpperCase()} ({col.questionsCount || 0})
                                    </option>
                                ))
                            ) : (
                                <option disabled>No collections found</option>
                            )}
                        </select>


                    </div>
                    <div className="p-3 bg-black/30 border border-zinc-800/50 rounded-xl">
                        <p className="text-[10px] leading-relaxed text-zinc-500 italic">Grouping questions helps you practice specific patterns more effectively.</p>
                    </div>
                    <LeetButton onClick={handleAddToCollection} text="Confirm Add" icon={CheckCircle2} className="w-full justify-center py-3" />
                </div>
            </motion.div>
        </div>
    );
};

export default CollectionModal;