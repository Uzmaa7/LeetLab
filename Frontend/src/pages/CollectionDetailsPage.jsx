
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, ExternalLink, Trash2, Search, 
    Square, CheckSquare, Trash, X, RefreshCcw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import DashboardLayout from '../components/DashboardLayout.jsx';
import { 
    getCollectionByIdService, 
    getCollectionQuestionsService, 
    removeSingleQuestionService,
    bulkRemoveQuestionsService,
    removeAllQuestionsService 
} from '../services/collection.service.js';

const CollectionDetailsPage = () => {
    const { collectionId } = useParams();
    const navigate = useNavigate();
    
    const [collectionInfo, setCollectionInfo] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    const fetchDetails = useCallback(async () => {
        setLoading(true);
        try {
            const [infoRes, questionsRes] = await Promise.all([
                getCollectionByIdService(collectionId),
                getCollectionQuestionsService(collectionId)
            ]);
            setCollectionInfo(infoRes?.data?.collection);
            setQuestions(questionsRes?.data?.questions || []);
        } catch (err) {
            toast.error("Failed to load collection details");
        } finally {
            setLoading(false);
        }
    }, [collectionId]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);

    const handleRemoveQuestion = async (qId) => {
        if (window.confirm("Remove this question from collection?")) {
            try {
                await removeSingleQuestionService(collectionId, qId);
                toast.success("Question removed");
                setQuestions(prev => prev.filter(q => q._id !== qId));
                setSelectedIds(prev => prev.filter(id => id !== qId));
            } catch (err) {
                toast.error("Failed to remove question");
            }
        }
    };

    const handleBulkRemove = async () => {
        if (window.confirm(`Remove ${selectedIds.length} questions?`)) {
            const loadingToast = toast.loading("Removing selected...");
            try {
                // Map to get the actual question ID if your aggregation returns it differently
                // Usually it's q.question._id or q._id depending on your schema
                await bulkRemoveQuestionsService(collectionId, selectedIds);
                toast.dismiss(loadingToast);
                toast.success("Selected questions removed");
                setQuestions(prev => prev.filter(q => !selectedIds.includes(q._id)));
                setSelectedIds([]);
            } catch (err) {
                toast.dismiss(loadingToast);
                toast.error("Bulk remove failed");
            }
        }
    };

    const handleRemoveAll = async () => {
        if (window.confirm("CRITICAL: Empty this entire collection?")) {
            const loadingToast = toast.loading("Clearing...");
            try {
                await removeAllQuestionsService(collectionId);
                toast.dismiss(loadingToast);
                toast.success("Collection cleared");
                setQuestions([]);
                setSelectedIds([]);
            } catch (err) {
                toast.dismiss(loadingToast);
                toast.error("Failed to clear");
            }
        }
    };

    const toggleSelection = (id) => {
    setSelectedIds(prev => {
        if (prev.includes(id)) {
            return prev.filter(item => item !== id);
        } else {
            return [...prev, id];
        }
    });
};

    const filteredQuestions = questions.filter(q => {
        const title = q.question?.title || ""; 
        return title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <DashboardLayout
            activeTab="Collections"
            title={collectionInfo?.name || "Collection"}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            actionButton={
                <div className="flex gap-2">
                    {/* Only show Clear All if there are questions */}
                    {questions.length > 0 && (
                        <button 
                            onClick={handleRemoveAll}
                            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                        >
                            <RefreshCcw size={14} /> Clear All
                        </button>
                    )}
                    <button 
                        onClick={() => navigate('/user/collections')}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-400 hover:text-white transition-all"
                    >
                        <ChevronLeft size={16} /> Back
                    </button>
                </div>
            }
        >
            {/* Header Description */}
            {/* <div className="mb-8 p-6 bg-gradient-to-r from-orange-600/10 to-transparent border border-orange-500/20 rounded-3xl">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{collectionInfo?.name}</h2>
                <p className="text-zinc-500 text-sm mt-2 font-medium">{collectionInfo?.description || "No description provided."}</p>
            </div> */}

            <div className="bg-[#18181B] border border-zinc-700 rounded-2xl overflow-hidden shadow-sm mb-20">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-black/20 border-b border-zinc-700">
                        <tr>
                            {/* Checkbox Header */}
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-600 w-16 text-center italic">Select</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-600">Title</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-zinc-600 text-right">Actions</th>
                        </tr>
                    </thead>

{/* ... Table structure ... */}
<tbody className="divide-y divide-zinc-700/50">
    {filteredQuestions.length > 0 ? (
        filteredQuestions.map((q) => {
            // Hum rowId ko hamesha unique rakhte hain
            const rowId = q._id; 

            return (
                <motion.tr 
                    key={rowId} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="group hover:bg-zinc-900/30 transition-all"
                >
                    <td className="px-6 py-5 text-center">
                        <button 
                            type="button" 
                            onClick={(e) => {
                                e.stopPropagation(); // Bubbling rokne ke liye
                                toggleSelection(rowId);
                            }}
                        >
                            {selectedIds.includes(rowId) ? (
                                <CheckSquare size={18} className="mx-auto text-orange-500" />
                            ) : (
                                <Square size={18} className="mx-auto text-zinc-800 group-hover:text-zinc-700 transition-colors" />
                            )}
                        </button>
                    </td>
                    
                    <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-zinc-200">
                                {q.question?.title || "Untitled"}
                            </span>
                            <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-900/50 w-fit px-2 py-0.5 rounded border border-slate-800">
                                {q.question?.platform}
                            </span>
                        </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                            <button 
                                onClick={() => handleRemoveQuestion(q._id)}
                                className="p-2 text-zinc-500 hover:text-rose-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                            <a 
                                href={q.question?.questionUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 hover:bg-blue-600 transition-all"
                            >
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </td>
                </motion.tr>
            );
        })
    ) : (
        <tr>
            <td colSpan="3" className="px-6 py-20 text-center text-zinc-600 italic">
                No questions in this collection yet.
            </td>
        </tr>
    )}
</tbody>


                </table>
            </div>

            {/* FLOATING ACTION BAR FOR BULK REMOVE */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div 
                        initial={{ y: 100, x: "-50%" }} 
                        animate={{ y: -40, x: "-50%" }} 
                        exit={{ y: 100, x: "-50%" }} 
                        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-zinc-950 border border-zinc-800 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-2xl"
                    >
                        <span className="text-zinc-100 font-bold text-sm">{selectedIds.length} Selected</span>
                        <div className="h-4 w-[1px] bg-zinc-800" />
                        <button 
                            onClick={handleBulkRemove}
                            className="flex items-center gap-2 text-rose-500 hover:text-rose-400 font-black text-[10px] uppercase tracking-widest"
                        >
                            <Trash size={16} /> Remove From Collection
                        </button>
                        <button onClick={() => setSelectedIds([])} className="text-zinc-500 hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default CollectionDetailsPage;

