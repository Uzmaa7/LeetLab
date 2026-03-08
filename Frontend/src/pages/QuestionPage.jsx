
import React, { useState, useEffect, useCallback } from 'react';
import {
    Search, Plus, ExternalLink, Trophy, LayoutGrid, Swords, BarChart3,
    X, Link as LinkIcon, Tag, ChevronDown, Microscope, Layers, Flame, ChevronUp,
    CheckCircle2, Edit3, Trash2, Square, CheckSquare, FolderPlus, Laptop, Sparkles, CloudMoon
} from 'lucide-react';
import { deleteQuestionService, getAllQuestionsService, updateQuestionService, uploadQuestionService } from "../services/question.services.js";
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { LeetButton } from '../components/index.jsx';
import DashboardLayout from '../components/DashboardLayout.jsx';
// import TreeAnimation from '../components/TreeAnimation.jsx';








const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Problems");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [editingId, setEditingId] = useState(null); // Tracks if we are updating
    const [selectedIds, setSelectedIds] = useState([]); // Track checked checkboxes
    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

    //pagination
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalQuestions: 0
    });


    // Filter States (UI Only)
    const [searchTerm, setSearchTerm] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [tagFilter, setTagFilter] = useState("All");
    const [isTagsExpanded, setIsTagsExpanded] = useState(false);
    const [platformFilter, setPlatformFilter] = useState("All");


    const [formData, setFormData] = useState({
        title: "", platform: "leetcode", difficulty: "easy", questionUrl: "", topics: ""
    });

    const availableTags = [
        "Array", "String", "HashTable", "Math", "Dynamic Programming",
        "Graph", "Stack", "Linked List", "Binary Tree", "Recursion"
    ];

    const tabs = [
        { name: "Problems", icon: <Microscope size={18} /> },
        { name: "Collections", icon: <BarChart3 size={18} /> },
        { name: "Contest", icon: <Swords size={18} /> },
        { name: "Toppers", icon: <Trophy size={18} /> }
    ];


    const fetchQuestions = useCallback(async (page = 1) => {
        setLoading(true);
        try {

            // Backend pagination params bheje: page aur limit (default 20)
            const response = await getAllQuestionsService({ page, limit: 5 });
            console.log("Full Response for Uzma:", response);

            // Backend se data extract kiya
            const { questions, pages, totalQuestions, page: current } = response?.data || {};

            setQuestions(Array.isArray(questions) ? questions : []);

            setFilteredQuestions(questions || []);

            // Pagination state update ki
            setPagination({
                currentPage: current || 1,
                totalPages: pages || 1,
                totalQuestions: totalQuestions || 0
            });

        } catch (err) {
            console.error("Fetch error:", err);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === "Problems") {
            fetchQuestions(1);
        }
    }, [activeTab, fetchQuestions]);

    // Filtering Logic
    useEffect(() => {
        let result = questions;
        if (searchTerm) {
            result = result.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (difficultyFilter !== "All") {
            result = result.filter(q => q.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
        }
        if (tagFilter !== "All") {
            result = result.filter(q => q.topics?.some(t => t.toLowerCase() === tagFilter.toLowerCase()));
        }

        if (platformFilter !== "All") result = result.filter(q => q.platform.toLowerCase() === platformFilter.toLowerCase());


        setFilteredQuestions(result);
    }, [searchTerm, difficultyFilter, tagFilter, platformFilter, questions]);

    const handleCheckboxChange = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };


    const handleUploadOrUpdate = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                // FIX: Update ke waqt hume split karne ki zaroorat nahi hai 
                // kyunki backend sirf title, difficulty, aur platform maang raha hai.
                const updatePayload = {
                    title: formData.title.trim(),
                    difficulty: formData.difficulty.toLowerCase(),
                    platform: formData.platform.toLowerCase()
                };

                await updateQuestionService(editingId, updatePayload);
                toast.success("Question updated");
            } else {
                // Upload ke waqt string ko array banana zaroori hai
                const formattedTopics = typeof formData.topics === 'string'
                    ? formData.topics.split(',').map(t => t.trim()).filter(t => t !== "")
                    : [];

                const uploadPayload = {
                    title: formData.title.trim(),
                    platform: formData.platform.toLowerCase(),
                    difficulty: formData.difficulty.toLowerCase(),
                    questionUrl: formData.questionUrl.trim(),
                    topics: formattedTopics
                };

                await uploadQuestionService(uploadPayload);
                toast.success("Problem uploaded successfully!");
            }

            setIsModalOpen(false);
            setFormData({ title: "", platform: "leetcode", difficulty: "easy", questionUrl: "", topics: "" });
            setTimeout(() => fetchQuestions(), 500);

        } catch (err) {
            console.error("Error details:", err);
            const backendError = err?.errors?.[0]?.msg || err?.message || "Operation failed";
            toast.error(backendError);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Move this question to trash?")) {
            try {
                await deleteQuestionService(id);
                toast.success("Question removed");
                setQuestions(prev => prev.filter(q => q._id !== id));
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    const openEditModal = (q) => {
        setEditingId(q._id);
        setFormData({
            title: q.title,
            platform: q.platform,
            difficulty: q.difficulty,
            questionUrl: q.questionUrl, // Backend might not allow updating URL, but we load it for UI
            topics: q.topics?.join(", ")
        });
        setIsModalOpen(true);
    };

    

return (
        <DashboardLayout
            activeTab="Problems"
            title="Question Bank"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            actionButton={<LeetButton onClick={() => { setEditingId(null); setIsModalOpen(true); }} text="Add Question" icon={Plus} />}
            filterBar={
                <div className="flex gap-2 w-full md:w-auto px-1">
                    <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-[11px] font-bold text-zinc-400 outline-none">
                        <option value="All">Platform</option>
                        <option value="leetcode">LeetCode</option>
                        <option value="gfg">GFG</option>
                        <option value="codeforces">CodeForces</option>
                    </select>
                    <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-[11px] font-bold text-zinc-400 outline-none">
                        <option value="All">Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <button onClick={() => setIsTagsExpanded(!isTagsExpanded)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${isTagsExpanded ? "bg-white text-black" : "bg-black border-zinc-800 text-zinc-400"}`}>
                        <Layers size={14} /> Topics
                    </button>
                </div>
            }
        >
            {/* 1. Topics Expansion */}
            <AnimatePresence>
                {isTagsExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-4 bg-[#18181B] border border-zinc-700 rounded-2xl flex flex-wrap gap-2 mb-6">
                        <button onClick={() => setTagFilter("All")} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase ${tagFilter === "All" ? "bg-white text-black" : "bg-black text-zinc-600 border border-zinc-800"}`}>All Topics</button>
                        {availableTags.map(tag => (
                            <button key={tag} onClick={() => setTagFilter(tag)} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase ${tagFilter === tag ? "bg-white text-black" : "bg-black text-zinc-600 border border-zinc-800"}`}>{tag}</button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Main Table Content */}
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
                                            <button onClick={() => { setEditingId(q._id); setFormData(q); setIsModalOpen(true); }} className="p-1.5 text-zinc-500 hover:text-white"><Edit3 size={14} /></button>
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

            {/* 3. Pagination */}
            {pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between px-2 pb-24">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase">Total {pagination.totalQuestions} Questions</span>
                    <div className="flex items-center gap-2">
                        <button disabled={pagination.currentPage === 1} onClick={() => fetchQuestions(pagination.currentPage - 1)} className="p-2 bg-[#18181B] border border-zinc-700 rounded-lg disabled:opacity-30"><ChevronUp className="-rotate-90" size={16} /></button>
                        <div className="flex gap-1">
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button key={i} onClick={() => fetchQuestions(i + 1)} className={`w-8 h-8 rounded-lg text-[10px] font-black border ${pagination.currentPage === i + 1 ? "bg-orange-600 border-orange-500 text-white" : "bg-[#18181B] border-zinc-800 text-zinc-500"}`}>{i + 1}</button>
                            ))}
                        </div>
                        <button disabled={pagination.currentPage === pagination.totalPages} onClick={() => fetchQuestions(pagination.currentPage + 1)} className="p-2 bg-[#18181B] border border-zinc-700 rounded-lg disabled:opacity-30"><ChevronUp className="rotate-90" size={16} /></button>
                    </div>
                </div>
            )}

            {/* 4. Floating Multi-Select Bar */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div initial={{ y: 100, x: "-50%" }} animate={{ y: -40, x: "-50%" }} exit={{ y: 100, x: "-50%" }} className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-zinc-950 border border-zinc-800 backdrop-blur-xl px-6 py-3 rounded-2xl">
                        <span className="text-zinc-100 font-bold text-sm">{selectedIds.length} Selected</span>
                        <button onClick={() => setIsCollectionModalOpen(true)} className="text-zinc-400 hover:text-blue-500"><FolderPlus size={20} /></button>
                        <button onClick={() => setSelectedIds([])} className="text-zinc-400 hover:text-rose-500"><Trash2 size={20} /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. Modals (Add Question & Collection) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-md bg-[#18181B] border border-zinc-700 p-6 rounded-2xl shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">{editingId ? 'Update' : 'New'} Question</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={16} /></button>
                            </div>
                            <form onSubmit={handleUploadOrUpdate} className="space-y-4">
                                <input required className="w-full bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none focus:border-orange-500/40" value={formData.title} placeholder="Title (e.g. Two Sum)" onChange={(e) => setFormData({...formData, title: e.target.value})} />
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-zinc-400 outline-none" value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})}>
                                        <option value="leetcode">LeetCode</option>
                                        <option value="gfg">GFG</option>
                                        <option value="codeforces">Codeforces</option>
                                    </select>
                                    <select className="bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-zinc-400 outline-none" value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                                {!editingId && <input required type="url" className="w-full bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none" value={formData.questionUrl} placeholder="Question URL" onChange={(e) => setFormData({...formData, questionUrl: e.target.value})} />}
                                <input className="w-full bg-black/50 border border-zinc-800 p-3 rounded-xl text-xs text-white outline-none" value={formData.topics} placeholder="Topics (comma separated)" onChange={(e) => setFormData({...formData, topics: e.target.value})} />
                                <LeetButton type="submit" text={editingId ? 'Save Changes' : 'Add Question'} icon={editingId ? CheckCircle2 : Plus} className="w-full justify-center" />
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
};

export default QuestionPage;







// this is the perfectly runnning code for tree animation -> in future i can use it anywhere
// const HeroAnimation = ({ activeTab }) => {
//     // 🍂 Realistic Autumn Falling Leaves
//     const leafVariants = {
//         initial: (i) => ({
//             y: 10 + Math.random() * 20,
//             opacity: 0,
//             rotate: Math.random() * 360,
//             x: 185 + (i * 10 - 25)
//         }),
//         animate: (i) => {
//             const direction = i % 3 === 0 ? 1 : (i % 3 === 1 ? -1 : 0);
//             const spread = 80 + Math.random() * 80;
//             const speedVar = 10 + Math.random() * 5;

//             return {
//                 y: [20, 100, 200, 280],
//                 opacity: [0, 1, 0.9, 0],
//                 rotate: [0, 360, 720, 1080],
//                 x: [
//                     185,
//                     185 + (spread * 0.5 * direction),
//                     185 - (spread * 0.2 * direction),
//                     185 + (spread * direction)
//                 ],
//                 transition: {
//                     duration: speedVar,
//                     repeat: Infinity,
//                     delay: i * 2.2,
//                     ease: [0.4, 0, 0.2, 1]
//                 }
//             };
//         }
//     };

//     const autumnColors = ["#e67e22", "#d35400", "#f39c12", "#c0392b", "#e74c3c"];

//     return (

//         <div className="relative w-full max-w-[240px] h-[260px] mb-[-60px] overflow-visible hidden md:block select-none drop-shadow-[0_0_20px_rgba(230,126,34,0.15)] mx-auto z-30">

//             {/* Atmospheric Icons */}
//             <motion.div
//                 animate={{ y: [0, -4, 0], opacity: [0.15, 0.3, 0.15] }}
//                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute top-6 left-8 text-blue-300/15"
//             >
//                 <CloudMoon size={28} />
//             </motion.div>


//             <svg viewBox="0 0 450 300"
//                 className="w-full h-full scale-150 origin-bottom translate-y-4 overflow-visible">
//                 <defs>
//                     <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//                         <stop offset="0%" stopColor="#3e2a18" />
//                         <stop offset="60%" stopColor="#2c1a11" />
//                         <stop offset="100%" stopColor="#1a100a" />
//                     </linearGradient>

//                     <radialGradient id="canopyGlow" cx="50%" cy="50%" r="50%">
//                         <stop offset="0%" stopColor="#d35400" stopOpacity="0.1" />
//                         <stop offset="100%" stopColor="#d35400" stopOpacity="0" />
//                     </radialGradient>

//                     <radialGradient id="laptopGlow" cx="50%" cy="50%" r="50%">
//                         <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
//                         <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
//                     </radialGradient>
//                 </defs>

//                 {/* 1. Ground and Ground Leaves */}
//                 <ellipse cx="210" cy="275" rx="90" ry="12" fill="rgba(0,0,0,0.1)" />

//                 {[...Array(18)].map((_, i) => (
//                     <ellipse
//                         key={`ground-leaf-${i}`}
//                         cx={140 + (i % 7) * 25 + Math.random() * 15}
//                         cy={272 + (i % 3) * 3 + Math.random() * 5}
//                         rx={3 + Math.random() * 2}
//                         ry={1.5 + Math.random() * 1}
//                         fill={autumnColors[i % autumnColors.length]}
//                         opacity={0.6 - Math.random() * 0.3}
//                         transform={`rotate(${Math.random() * 360} ${140 + (i % 7) * 25 + Math.random() * 15} ${272 + (i % 3) * 3 + Math.random() * 5})`}
//                     />
//                 ))}

//                 {/* 2. Enhanced Realistic Tree Trunk */}
//                 <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//                     <path d="M200,275 L225,275 Q215,190 195,130 L180,130 Q195,200 200,275 Z" fill="url(#trunkGrad)" />
//                     <path d="M203,240 Q206,190 200,150" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none" />
//                     <path d="M198,220 Q194,180 190,140" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" fill="none" />

//                     <path d="M190,130 Q160,110 140,70 Q130,50 145,40" stroke="url(#trunkGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
//                     <path d="M190,130 Q220,110 240,80 Q250,60 235,50" stroke="url(#trunkGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
//                     <path d="M190,130 Q195,110 210,90 Q215,80 205,70" stroke="url(#trunkGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />

//                     <path d="M165,110 L145,100" stroke="#3e2a18" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//                     <path d="M215,100 L230,90" stroke="#3e2a18" strokeWidth="1.5" fill="none" strokeLinecap="round" />
//                 </motion.g>


//                 {/* 3. Lush Autumn Canopy*/}
//                 <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 1.2 }} className="z-10">
//                     {/* Base glow widely spread, made softer */}
//                     <ellipse cx="190" cy="75" rx="130" ry="60" fill="url(#canopyGlow)" opacity="0.15" />

//                     {/* Clusters*/}
//                     {[...Array(25)].map((_, i) => (
//                         <circle
//                             key={`canopy-cluster-${i}`}
//                             cx={90 + (i % 8) * 28 + Math.random() * 30} // Maximized X range
//                             cy={25 + (i % 4) * 20 + Math.random() * 20}
//                             r={16 + Math.random() * 10}
//                             fill={autumnColors[i % autumnColors.length]}
//                             opacity={0.1 + Math.random() * 0.15}
//                         />
//                     ))}

//                     {/* Static Leaves: Density significantly reduced to 45 for airiness */}
//                     {[...Array(45)].map((_, i) => {
//                         // Spread across a very wide X (80 to 300)
//                         const randomX = 100 + Math.random() * 220;
//                         const randomY = 20 + Math.random() * 110;
//                         return (
//                             <ellipse
//                                 key={`static-leaf-${i}`}
//                                 fill={autumnColors[Math.floor(Math.random() * autumnColors.length)]}
//                                 opacity={0.35 + Math.random() * 0.25}
//                                 cx={randomX}
//                                 cy={randomY}
//                                 rx={6 + Math.random() * 3}
//                                 ry={3 + Math.random() * 2}
//                                 transform={`rotate(${Math.random() * 360} ${randomX} ${randomY})`}
//                             />
//                         );
//                     })}
//                 </motion.g>

//                 {/* 4. Realistic Falling Autumn Leaves */}
//                 {[...Array(10)].map((_, i) => (
//                     <motion.g key={i} custom={i} variants={leafVariants} initial="initial" animate="animate">
//                         <ellipse
//                             rx={3.5 + Math.random() * 2}
//                             ry={1.5 + Math.random() * 1}
//                             fill={autumnColors[i % autumnColors.length]}
//                             opacity={0.9}
//                         />
//                     </motion.g>
//                 ))}

//                 {/* 5. Enhanced Figure Sitting */}
//                 <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
//                     <path d="M215,275 L245,275 C250,275 250,260 235,255 L220,250 Z" fill="#1f293a" />
//                     <path d="M208,275 L218,275 L230,230 C230,220 215,220 208,230 Z" fill="#314051" />
//                     <circle cx="218" cy="220" r="8" fill="#2c3747" />
//                     <path d="M220,214 Q226,214 226,220" stroke="#2c3747" strokeWidth="2.5" fill="none" />
//                     <path d="M223,245 L238,248" stroke="#314051" strokeWidth="3.5" strokeLinecap="round" />

//                     <motion.g animate={{ rotate: [0, -1.8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
//                         <rect x="235" y="250" width="24" height="2.5" fill="#465467" rx="1" />
//                         <path d="M238,250 L258,228 L261,230 L241,252 Z" fill="#627288" />
//                         <circle cx="253" cy="238" r="10" fill="url(#laptopGlow)" />
//                         <Laptop className="z-10" size={10} style={{ x: 236, y: 250 }} fill="none" stroke="#2c3747" strokeWidth={1} />
//                     </motion.g>
//                 </motion.g>

//                 <motion.path
//                     d="M130,275 L290,275"
//                     stroke="#e67e22"
//                     strokeWidth="0.5"
//                     animate={{ opacity: [0.05, 0.25, 0.05] }}
//                     transition={{ duration: 5, repeat: Infinity }}
//                 />
//             </svg>
//         </div>
//     );
// };



        //if above code creates problem then just copy paste this return code bcz it is working absolutely fine
        // return (
    //     <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-blue-500/30 overflow-x-hidden">

    //         {/* FIX: Parent ko 'pointer-events-none' diya taaki ye niche ke elements (tree) ke interaction ya visuals ko block na kare */}
    //         <div className="pt-32 flex justify-center sticky top-0 bg-transparent z-50 pointer-events-none">

    //             {/* inner div: sirf buttons jitni width lega 'w-max' ki wajah se aur blur sirf yahi apply hoga */}
    //             <div className="inline-flex items-center gap-1 p-1 bg-[#0A0A0A]/80 backdrop-blur-md rounded-lg border border-zinc-800 scale-90 md:scale-100 w-max shadow-2xl pointer-events-auto">
    //                 {tabs.map((tab) => (
    //                     <button
    //                         key={tab.name}
    //                         onClick={() => setActiveTab(tab.name)}
    //                         className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[11px] font-bold transition-all whitespace-nowrap ${activeTab === tab.name
    //                             ? "bg-zinc-800 text-white shadow-sm"
    //                             : "text-zinc-500 hover:text-zinc-300"
    //                             }`}
    //                     >
    //                         {tab.icon} {tab.name}
    //                     </button>
    //                 ))}
    //             </div>
    //         </div>
    //         {/* new */}

    //         <main className="max-w-7xl mx-auto px-10  relative">
    //             {activeTab === "Problems" && (
    //                 <div className="space-y-2">

    //                     {/* -------------- */}
    //                     {/* HIGHLIGHT: Tree Size Increased + Heading Moved Extreme Left */}
    //                     <div className="flex items-end justify-start mt-[-155px] w-full min-h-[280px] relative overflow-visible z-20">

    //                         {/* 1. Hero Animation - Bigger & Aligned to Left Edge */}
    //                         <div className="flex-none -ml-8 -mb-2 overflow-visible">
    //                             <HeroAnimation activeTab={activeTab} />
    //                         </div>

    //                         {/* 2. Heading - Shifted with Negative Margin to sit close to the Tree */}
    //                         <div className="mb-6 -ml-16 z-40 relative">
    //                             <motion.div
    //                                 initial={{ opacity: 0, x: -10 }}
    //                                 animate={{ opacity: 1, x: 0 }}
    //                                 transition={{ duration: 0.8 }}
    //                                 className="text-left"
    //                             >
    //                                 <h1 className="text-3xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white via-white/80 to-orange-600 bg-clip-text text-transparent leading-none">
    //                                     Question Bank
    //                                 </h1>

    //                             </motion.div>
    //                         </div>

    //                         {/* 3. Spacer */}
    //                         <div className="flex-grow" />

    //                         {/* 4. Add Question Button */}



    //                         {/* LeetButton */}
    //                         <div className="mb-6 mr-4">
    //                             <button
    //                                 onClick={() => { setEditingId(null); setIsModalOpen(true); }}
    //                                 className="group relative flex items-center gap-2 px-6 py-2.5 bg-zinc-900 border border-zinc-700 hover:border-orange-500/50 rounded-xl transition-all duration-300 shadow-2xl shadow-black"
    //                             >
    //                                 {/* Hover Glow Effect Layer */}
    //                                 <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />

    //                                 {/* Plus Icon with Pulse Animation */}
    //                                 <Plus
    //                                     size={14}
    //                                     className="text-orange-500 group-hover:scale-110 transition-transform duration-300"
    //                                 />

    //                                 {/* Button Text */}
    //                                 <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-300 group-hover:text-white transition-colors">
    //                                     Add Question
    //                                 </span>

    //                                 {/* Bottom subtle accent line */}
    //                                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-orange-500 group-hover:w-1/2 transition-all duration-500" />
    //                             </button>
    //                         </div>
    //                         {/* LeetButton */}

    //                     </div>

    //                     {/* 3. Compact Filters Bar */}
    //                     <div className="flex flex-col md:flex-row items-center  p-1 bg-[#18181B] border border-zinc-700 rounded-2xl">
    //                         <div className="relative flex-grow group">
    //                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500" size={16} />
    //                             <input placeholder="Search title..." className="w-full bg-black border border-zinc-900 py-2 pl-10 pr-4 rounded-xl outline-none text-[11px] focus:border-zinc-700 transition-all text-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    //                         </div>

    //                         <div className="flex gap-2 w-full md:w-auto">
    //                             <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-[11px] font-bold text-zinc-400 outline-none cursor-pointer focus:border-zinc-700 appearance-none min-w-[110px]">
    //                                 <option value="All">Platform</option>
    //                                 <option value="leetcode">LeetCode</option>
    //                                 <option value="gfg">GFG</option>
    //                                 <option value="codeforces">CodeForces</option>
    //                                 <option value="other">Other</option>
    //                             </select>

    //                             <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-[11px] font-bold text-zinc-400 outline-none cursor-pointer focus:border-zinc-700 appearance-none min-w-[110px]">
    //                                 <option value="All">Difficulty</option>
    //                                 <option value="easy">Easy</option>
    //                                 <option value="medium">Medium</option>
    //                                 <option value="hard">Hard</option>
    //                             </select>

    //                             <button onClick={() => setIsTagsExpanded(!isTagsExpanded)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${isTagsExpanded ? "bg-white text-black border-white" : "bg-black border-zinc-800 text-zinc-400"}`}>
    //                                 <Layers size={14} /> Topics
    //                             </button>
    //                         </div>
    //                     </div>

    //                     <AnimatePresence>
    //                         {isTagsExpanded && (
    //                             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="p-4 bg-[#18181B] border border-zinc-700 rounded-2xl flex flex-wrap gap-2 overflow-hidden shadow-inner">
    //                                 <button onClick={() => setTagFilter("All")} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${tagFilter === "All" ? "bg-white text-black" : "bg-black text-zinc-600 border border-zinc-800 hover:text-white"}`}>All Topics</button>
    //                                 {availableTags.map(tag => (
    //                                     <button key={tag} onClick={() => setTagFilter(tag)} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${tagFilter === tag ? "bg-white text-black" : "bg-black text-zinc-600 border border-zinc-800 hover:border-zinc-700"}`}>{tag}</button>
    //                                 ))}
    //                             </motion.div>
    //                         )}
    //                     </AnimatePresence>

    //                     {/* 4. Main Table */}
    //                     <div className="bg-[#18181B] border border-zinc-700 rounded-2xl overflow-hidden mt-6 shadow-sm">
    //                         <table className="w-full text-left border-collapse">
    //                             <thead className="bg-black/20 border-b border-zinc-700">
    //                                 <tr>
    //                                     <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600 w-16 text-center italic font-black">Status</th>
    //                                     <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600 font-black">Title</th>
    //                                     <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600 font-black">Tags</th>
    //                                     <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-600 font-black">Action</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody className="divide-y divide-zinc-700/50 text-[17px]">
    //                                 {filteredQuestions.map((q, idx) => (
    //                                     <motion.tr key={q._id || idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group hover:bg-zinc-900/30 transition-all">
    //                                         <td className="px-6 py-5 text-center">
    //                                             <button onClick={() => handleCheckboxChange(q._id)}>
    //                                                 {selectedIds.includes(q._id) ?
    //                                                     <CheckSquare size={18} className="mx-auto text-blue-500 fill-blue-500/10" /> :
    //                                                     <Square size={18} className="mx-auto text-zinc-800 hover:text-zinc-600" />
    //                                                 }
    //                                             </button>
    //                                         </td>
    //                                         <td className="px-4 py-5">
    //                                             <div className="flex flex-col gap-1">
    //                                                 <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{q.title}</span>
    //                                                 <div className="flex items-center gap-2">

    //                                                     <span className="text-[11px] font-black font-semibold uppercase text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-md shadow-sm tracking-widest px-2 py-0.5">
    //                                                         {q.platform}
    //                                                     </span>

    //                                                     {/* Difficulty Box */}
    //                                                     <span className={`text-[11px] font-black font-semibold uppercase px-2 py-0.5 rounded-md border tracking-widest ${q.difficulty === 'easy'
    //                                                         ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-500'
    //                                                         : q.difficulty === 'medium'
    //                                                             ? 'bg-amber-950/30 border-amber-900/50 text-amber-500'
    //                                                             : 'bg-rose-950/30 border-rose-900/50 text-rose-600'
    //                                                         }`}>
    //                                                         {q.difficulty}
    //                                                     </span>
    //                                                 </div>
    //                                             </div>
    //                                         </td>

    //                                         <td className="px-4 py-6">
    //                                             <div className="flex flex-wrap gap-2">
    //                                                 {q.topics?.map((t) => (
    //                                                     <span
    //                                                         key={t}
    //                                                         className="text-[12px] font-black font-semibold text-slate-400 bg-slate-800/40 border border-slate-700/50 rounded-md shadow-sm tracking-widest px-2 py-0.5"
    //                                                     >
    //                                                         {t.toLowerCase()}
    //                                                     </span>
    //                                                 ))}
    //                                             </div>
    //                                         </td>
    //                                         <td className="px-6 py-5">
    //                                             <div className="flex items-center justify-end gap-2">
    //                                                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
    //                                                     <button onClick={() => { setEditingId(q._id); setFormData(q); setIsModalOpen(true); }} className="p-1.5 text-zinc-500 hover:text-white transition-colors"><Edit3 size={14} /></button>
    //                                                     <button onClick={() => handleDelete(q._id)} className="p-1.5 text-zinc-500 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
    //                                                 </div>
    //                                                 <div className="flex items-center gap-2 ml-2 border-l border-zinc-900 pl-3">
    //                                                     <a href={q.questionUrl} target="_blank" rel="noopener noreferrer"
    //                                                         className="p-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-lg transition-all border border-zinc-800 hover:bg-blue-600 hover:border-blue-500">
    //                                                         <ExternalLink size={16} />
    //                                                     </a>
    //                                                 </div>
    //                                             </div>
    //                                         </td>
    //                                     </motion.tr>
    //                                 ))}
    //                             </tbody>
    //                         </table>
    //                     </div>

    //                     {/* Pagination Bar*/}
    //                     {pagination.totalPages > 1 && (
    //                         <div className="mt-6 flex items-center justify-between px-2 pb-10">
    //                             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
    //                                 Total {pagination.totalQuestions} Questions
    //                             </span>

    //                             <div className="flex items-center gap-2">
    //                                 <button
    //                                     disabled={pagination.currentPage === 1}
    //                                     onClick={() => fetchQuestions(pagination.currentPage - 1)}
    //                                     className="p-2 bg-[#18181B] border border-zinc-700 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
    //                                 >
    //                                     <ChevronUp className="-rotate-90" size={16} />
    //                                 </button>

    //                                 <div className="flex items-center gap-1">
    //                                     {[...Array(pagination.totalPages)].map((_, i) => {
    //                                         const pageNum = i + 1;
    //                                         // Sirf current page ke aas-pass ke numbers dikhane ke liye (Optional logic)
    //                                         return (
    //                                             <button
    //                                                 key={pageNum}
    //                                                 onClick={() => fetchQuestions(pageNum)}
    //                                                 className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all border ${pagination.currentPage === pageNum
    //                                                         ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-900/20"
    //                                                         : "bg-[#18181B] border-zinc-800 text-zinc-500 hover:border-zinc-600"
    //                                                     }`}
    //                                             >
    //                                                 {pageNum}
    //                                             </button>
    //                                         );
    //                                     })}
    //                                 </div>

    //                                 <button
    //                                     disabled={pagination.currentPage === pagination.totalPages}
    //                                     onClick={() => fetchQuestions(pagination.currentPage + 1)}
    //                                     className="p-2 bg-[#18181B] border border-zinc-700 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
    //                                 >
    //                                     <ChevronUp className="rotate-90" size={16} />
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </div>
    //             )}
    //         </main>

    //         {/* 5. Floating Action Bar (When questions are selected) */}
    //         <AnimatePresence>
    //             {selectedIds.length > 0 && (
    //                 <motion.div initial={{ y: 100, x: "-50%" }} animate={{ y: -40, x: "-50%" }} exit={{ y: 100, x: "-50%" }}
    //                     className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
    //                     <span className="text-zinc-100 font-bold text-sm">{selectedIds.length} Selected</span>
    //                     <div className="h-4 w-[1px] bg-zinc-800 mx-2" />
    //                     <button onClick={() => setIsCollectionModalOpen(true)} className="text-zinc-400 hover:text-blue-500 transition-colors">
    //                         <Layers size={20} />
    //                     </button>
    //                     <button onClick={() => setSelectedIds([])} className="text-zinc-400 hover:text-rose-500 transition-colors">
    //                         <Trash2 size={20} />
    //                     </button>
    //                 </motion.div>
    //             )}
    //         </AnimatePresence>

    //         {/* Collection Modal (The Tabbed View from image 2) */}
    //         <AnimatePresence>
    //             {isCollectionModalOpen && (
    //                 <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
    //                     <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-sm bg-[#0A0A0A] border border-zinc-900 p-8 rounded-3xl">
    //                         <div className="flex justify-between items-center mb-6">
    //                             <div className="flex items-center gap-3">
    //                                 <div className="p-2 bg-blue-500/10 rounded-lg"><FolderPlus size={18} className="text-blue-500" /></div>
    //                                 <div>
    //                                     <h3 className="text-sm font-bold text-white tracking-tight">Add to Collection</h3>
    //                                     <p className="text-[10px] text-zinc-500">Save selected questions</p>
    //                                 </div>
    //                             </div>
    //                             <button onClick={() => setIsCollectionModalOpen(false)} className="text-zinc-600 hover:text-white"><X size={18} /></button>
    //                         </div>

    //                         <div className="space-y-4">
    //                             <div className="space-y-2">
    //                                 <label className="text-[10px] uppercase font-bold text-zinc-600 ml-1">Target Collection</label>
    //                                 <select className="w-full bg-black border border-zinc-900 p-3 rounded-xl text-xs outline-none text-zinc-400">
    //                                     <option>Choose a collection...</option>
    //                                     <option>Daily Practice</option>
    //                                     <option>Interview Prep</option>
    //                                 </select>
    //                             </div>
    //                             <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-xl text-[11px] text-zinc-500">
    //                                 <span className="font-bold text-zinc-400">Tip:</span> Grouping questions helps you practice specific topics more effectively.
    //                             </div>
    //                             <div className="flex gap-3 pt-2">
    //                                 <button onClick={() => setIsCollectionModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl text-[11px] font-bold text-zinc-400 hover:bg-zinc-900">Cancel</button>
    //                                 <button className="flex-1 bg-rose-900/80 text-white px-4 py-2.5 rounded-xl text-[11px] font-bold hover:bg-rose-800">Add to Collection</button>
    //                             </div>
    //                         </div>
    //                     </motion.div>
    //                 </div>
    //             )}
    //         </AnimatePresence>





    //         <AnimatePresence>
    //             {isModalOpen && (
    //                 <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    //                     <motion.div
    //                         initial={{ opacity: 0, scale: 0.95 }}
    //                         animate={{ opacity: 1, scale: 1 }}
    //                         exit={{ opacity: 0, scale: 0.95 }}
    //                         className="relative w-full max-w-md bg-[#18181B] border border-zinc-700 p-5 rounded-xl shadow-2xl max-h-[85vh] overflow-y-auto"
    //                     >
    //                         {/* Header: Slim height */}
    //                         <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
    //                             <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
    //                                 <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
    //                                 {editingId ? 'Update' : 'New'} Question
    //                             </h3>
    //                             <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
    //                                 <X size={16} />
    //                             </button>
    //                         </div>

    //                         <form onSubmit={handleUploadOrUpdate} className="space-y-3">
    //                             {/* Title: Compact */}
    //                             <div className="space-y-1">
    //                                 <label className="text-[9px] uppercase font-bold text-zinc-600 ml-1">Title</label>
    //                                 <input
    //                                     required
    //                                     className="w-full bg-black/50 border border-zinc-800 p-2 rounded-lg text-[11px] outline-none focus:border-orange-500/40 text-white transition-all"
    //                                     value={formData.title}
    //                                     placeholder='Two Sum'
    //                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    //                                 />
    //                             </div>

    //                             <div className="grid grid-cols-2 gap-3">
    //                                 <div className="space-y-1">
    //                                     <label className="text-[9px] uppercase font-bold text-zinc-600 ml-1">Platform</label>
    //                                     <select
    //                                         className="w-full bg-black/50 border border-zinc-800 p-2 rounded-lg text-[11px] outline-none text-zinc-400 font-bold cursor-pointer"
    //                                         value={formData.platform}
    //                                         placeholder="Leetcode"
    //                                         onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
    //                                     >
    //                                         <option value="leetcode">LeetCode</option>
    //                                         <option value="gfg">GFG</option>
    //                                         <option value="gfg">Codeforces</option>
    //                                         <option value="gfg">Other</option>
    //                                     </select>
    //                                 </div>
    //                                 <div className="space-y-1">
    //                                     <label className="text-[9px] uppercase font-bold text-zinc-600 ml-1">Difficulty</label>
    //                                     <select
    //                                         className="w-full bg-black/50 border border-zinc-800 p-2 rounded-lg text-[11px] outline-none text-zinc-400 font-bold cursor-pointer"
    //                                         value={formData.difficulty}
    //                                         onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
    //                                     >
    //                                         <option value="easy">Easy</option>
    //                                         <option value="medium">Medium</option>
    //                                         <option value="hard">Hard</option>
    //                                     </select>
    //                                 </div>
    //                             </div>

    //                             {!editingId && (
    //                                 <div className="space-y-3">
    //                                     <div className="space-y-1">
    //                                         <label className="text-[9px] uppercase font-bold text-zinc-600 ml-1">URL</label>
    //                                         <input
    //                                             required
    //                                             type="url"
    //                                             className="w-full bg-black/50 border border-zinc-800 p-2 rounded-lg text-[11px] outline-none focus:border-orange-500/40 text-white transition-all"
    //                                             value={formData.questionUrl}
    //                                             placeholder='https://leetcode.com/problems'
    //                                             onChange={(e) => setFormData({ ...formData, questionUrl: e.target.value })}
    //                                         />
    //                                     </div>
    //                                     <div className="space-y-1">
    //                                         <label className="text-[9px] uppercase font-bold text-zinc-600 ml-1">Topics</label>
    //                                         <input
    //                                             placeholder="Array, DP..."
    //                                             className="w-full bg-black/50 border border-zinc-800 p-2 rounded-lg text-[11px] outline-none focus:border-orange-500/40 text-white transition-all"
    //                                             value={formData.topics}
    //                                             onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                             )}

    //                             {/* REUSABLE LEETBUTTON INTEGRATED HERE */}
    //                             <div className="pt-2">
    //                                 <LeetButton
    //                                     type="submit"
    //                                     text={editingId ? 'Save Changes' : 'Add Question'}
    //                                     icon={editingId ? CheckCircle2 : Plus}
    //                                     className="w-full justify-center py-3"
    //                                 />
    //                             </div>
    //                         </form>
    //                     </motion.div>
    //                 </div>
    //             )}
    //         </AnimatePresence>
    //     </div>
    // );