

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Circle, Edit3, Trash2, ChevronDown, ChevronUp, Layers, Zap, Trophy, Sparkles, Flame, ShieldCheck, Gem } from 'lucide-react';
import { getAllProblemsService, deleteProblemService } from '../services/problem.services';
import toast from 'react-hot-toast';
import { useUserContext } from '../contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user } = useUserContext();

    const [problems, setProblems] = useState([]);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("All");
    const [tagFilter, setTagFilter] = useState("All");
    const [isTagsExpanded, setIsTagsExpanded] = useState(false);



    const availableTags = [
        "Array", "String", "HashTable", "Math", "Dynamic Programming",
        "Graph", "Stack", "Linked List", "Monotonic Stack",
        "Binary Tree", "Binary Search Tree", "Topological Sort",
        "Doubly-Linked List", "Minimum Spanning Tree"
    ];

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await getAllProblemsService();
                // console.log("DASHBOARD DATA:", response);
                
                setProblems(response.problems || []);
                setFilteredProblems(response.problems || []);
            } catch (err) {
                toast.error("Failed to fetch problems");
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
        
    }, []);

    useEffect(() => {
        let result = problems;
        if (searchTerm) result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
        if (difficultyFilter !== "All") result = result.filter(p => p.difficulty === difficultyFilter);
        if (tagFilter !== "All") result = result.filter(p => p.tags?.includes(tagFilter));
        setFilteredProblems(result);
    }, [searchTerm, difficultyFilter, tagFilter, problems]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this challenge?")) {
            try {
                await deleteProblemService(id);
                toast.success("Problem removed");
                setProblems(prev => prev.filter(p => p._id !== id));
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#d85c8a]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-12 lg:px-20 font-sans text-zinc-100 selection:bg-orange-500/30">

            <div className="max-w-6xl mx-auto relative z-10">

                {/* --- HEADER SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex flex-col items-center mb-16 text-center"
                >
                    {/* Spotlight Glow: Sirf heading ke peeche */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-orange-500/20 blur-[100px] pointer-events-none z-0" />



                    {/* Heading with Left-to-Right Blend */}
                    <h1 className="relative z-10 text-3xl md:text-5xl font-black tracking-tighter leading-[1.2] uppercase">
                        <span className="bg-gradient-to-r from-white via-white/90 to-orange-500 bg-clip-text text-transparent">
                            Relax. You're smarter <br />
                            than the problem
                        </span>
                    </h1>



                    {/* Subtext */}
                    <p className="relative z-10 mt-6 max-w-lg text-zinc-500 text-sm md:text-base font-medium italic opacity-80">
                        "Don't let a semicolon ruin your mood. It'll click soon."
                    </p>
                </motion.div>

                {/* Filter Row  */}
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-8 bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                    <div className="w-full lg:flex-grow">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#d85c8a] transition-colors" size={18} />
                            <input
                                placeholder="Search challenges..."
                                className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-4 rounded-xl outline-none focus:border-[#d85c8a]/50 transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="relative w-full lg:w-48">
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold appearance-none focus:border-[#d85c8a]/50 outline-none cursor-pointer"
                        >
                            <option value="All">Difficulty: All</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
                    </div>

                    <button
                        onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all w-full lg:w-auto justify-center ${isTagsExpanded
                            ? "bg-[#d85c8a] border-[#d85c8a] text-black shadow-lg shadow-[#d85c8a]/20"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        <Layers size={16} />
                        Topics
                        {isTagsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>

                {isTagsExpanded && (
                    <div className="mb-8 p-6 bg-white/[0.01] border border-white/5 rounded-3xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setTagFilter("All")}
                                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${tagFilter === "All" ? "bg-[#d85c8a] text-black" : "bg-white/5 text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                All
                            </button>
                            {availableTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setTagFilter(tag)}
                                    className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${tagFilter === tag ? "bg-[#d85c8a] text-black" : "bg-white/5 text-zinc-500 hover:text-zinc-300 border border-white/5"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Problems Table with Alternating Backgrounds from FourthPage */}
                {/* --- TABLE AREA --- */}
                <motion.div
                    layout
                    className="rounded-3xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm overflow-hidden"
                >
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800/50 bg-zinc-900/50">
                                {/* Replace the first <th> */}
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Status</th>
                                <th className="px-4 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Title</th>
                                <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode='popLayout'>
                                {filteredProblems.map((problem, idx) => (
                                    <motion.tr
                                        key={problem._id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: idx * 0.08,
                                            ease: "easeOut"
                                        }}
                                        whileHover={{
                                            x: 8,
                                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                                            transition: { duration: 0.2 }
                                        }}
                                        onClick={() => navigate(`/problem/${problem._id}`)}
                                        className="group cursor-pointer border-b border-zinc-800/30 last:border-0 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="relative flex items-center justify-center w-10 h-10">
                                                {(problem.isSolved || idx === 0) ? (
                                                    <div className="relative">
                                                        {/* Floating Fire Icon */}
                                                        <motion.div
                                                            initial={{ y: 0, opacity: 0 }}
                                                            animate={{
                                                                y: -22,
                                                                opacity: 1,
                                                                scale: [1, 1.2, 1],
                                                            }}
                                                            transition={{
                                                                y: { duration: 0.4, ease: "easeOut" },
                                                                scale: { duration: 1.5, repeat: Infinity }
                                                            }}
                                                            className="absolute left-1/2 -translate-x-1/2 z-20"
                                                        >
                                                            <Flame
                                                                size={18}
                                                                className="text-orange-500 fill-orange-500/20 filter drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                                                            />
                                                        </motion.div>

                                                        {/* Orange Checked Box */}
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="w-5 h-5 rounded-md bg-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                                                        >
                                                            <motion.svg
                                                                viewBox="0 0 24 24"
                                                                className="w-3.5 h-3.5 text-black stroke-[4px]"
                                                                initial={{ pathLength: 0 }}
                                                                animate={{ pathLength: 1 }}
                                                                transition={{ delay: 0.2, duration: 0.3 }}
                                                            >
                                                                <motion.path
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    d="M20 6L9 17L4 12"
                                                                />
                                                            </motion.svg>
                                                        </motion.div>
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-md border-2 border-zinc-700 bg-zinc-950/50 group-hover:border-zinc-500 transition-all duration-300" />
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-4 py-6">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="text-base font-medium text-zinc-200 group-hover:text-white transition-colors">
                                                    {problem.title}
                                                </span>
                                                <div className="flex gap-2">
                                                    {problem.tags?.slice(0, 3).map(tag => (
                                                        <span key={tag} className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-md bg-zinc-950">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-8 py-6 text-right">
                                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${problem.difficulty === 'Easy' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' :
                                                    problem.difficulty === 'Medium' ? 'border-amber-500/20 text-amber-500 bg-amber-500/5' :
                                                        'border-rose-500/20 text-rose-500 bg-rose-500/5'
                                                }`}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>


            </div>
        </div>
    );
};

export default DashboardPage;



