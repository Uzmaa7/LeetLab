import React, { useState, useEffect, useCallback } from 'react';
import { FolderPlus, Globe, Lock, Edit3, Trash2, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout.jsx';
import { LeetButton } from '../components';
import { 
    getAllCollectionsService, 
    createCollectionService, 
    deleteCollectionService, 
    updateCollectionService 
} from "../services/collection.service.js"
import { useNavigate } from 'react-router-dom';

const CollectionPage = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Collections");

    const navigate = useNavigate();
    
    // UI States
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", isPrivate: false });

    // Fetch Logic
    const fetchCollections = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllCollectionsService(1, 20); // Backend page/limit logic
            setCollections(response?.data?.allCollections || []);
        } catch (err) {
            toast.error(err?.message || "Failed to load collections");
        } finally {
            setLoading(false);
        }
    }, []);

    

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    // Search Filtering (Local for UI)
    const filteredCollections = collections.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // CRUD Handlers
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCollectionService(editingId, formData);
                toast.success("Collection updated");
            } else {
                await createCollectionService(formData);
                toast.success("New collection created!");
            }
            setIsModalOpen(false);
            setFormData({ name: "", description: "", isPrivate: false });
            fetchCollections();
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure? All saved questions will be unlinked.")) {
            try {
                await deleteCollectionService(id);
                toast.success("Collection deleted");
                fetchCollections();
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <DashboardLayout
            activeTab="Collections"
            setActiveTab={setActiveTab}
            title="Collections"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            // DashboardLayout ab filterBar render nahi karega kyunki hum bhej hi nahi rahe (Requirement met!)
            actionButton={
                <LeetButton 
                    onClick={() => { setEditingId(null); setIsModalOpen(true); }} 
                    text="Create Collection" 
                    icon={FolderPlus} 
                />
            }
        >
            {/* Collection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-24">
                {filteredCollections.map((col) => (
                    <motion.div
                        key={col._id}
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
                                <button onClick={() => { setEditingId(col._id); setFormData(col); setIsModalOpen(true); }} className="p-2 text-zinc-500 hover:text-white bg-black/40 rounded-xl"><Edit3 size={14} /></button>
                                <button onClick={() => handleDelete(col._id)} className="p-2 text-zinc-500 hover:text-rose-500 bg-black/40 rounded-xl"><Trash2 size={14} /></button>
                            </div>
                        </div>

                        <div className="mt-6 relative z-10">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight truncate">{col.name}</h3>
                            <p className="text-xs text-zinc-500 mt-2 line-clamp-2 h-8 font-medium leading-relaxed">
                                {col.description || "Organize your problems for easy practice."}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                    {col.questionsCount || 0} Questions
                                </span>
                                {col.isPrivate ? <Lock size={14} className="text-zinc-600" /> : <Globe size={14} className="text-emerald-500/40" />}
                            </div>
                            <button 
    onClick={() => navigate(`/user/collections/${col._id}`)}
    className="flex items-center gap-1 text-[10px] font-black text-orange-500..."
>
    View Full <ChevronRight size={12} />
</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal for Create/Update */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md bg-[#0A0A0A] border border-zinc-800 p-8 rounded-[2rem] shadow-2xl">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                    <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                                    {editingId ? 'Update' : 'New'} Collection
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-zinc-600 hover:text-white transition-colors"><X size={20} /></button>
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
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default CollectionPage;