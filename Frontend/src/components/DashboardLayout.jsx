import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Search, Plus, ExternalLink, Trophy, LayoutGrid, Swords, BarChart3,
    X, Link as LinkIcon, Tag, ChevronDown, Microscope, Layers, Flame, ChevronUp,
    CheckCircle2, Edit3, Trash2, Square, CheckSquare, FolderPlus, Laptop, Sparkles, CloudMoon
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import TreeAnimation from './TreeAnimation';

const DashboardLayout = ({ 
    activeTab, 
    setActiveTab, 
    title, 
    searchTerm, 
    setSearchTerm, 
    actionButton, // Dynamic Button (Add Question / Create Collection)
    filterBar,    // Dynamic Filters (Dropdowns etc.)
    children ,
    hideSearch,     // Niche ka content (Table ya Grid)
}) => {
    const navigate = useNavigate();
    // FIX: Yahan path add karna zaroori hai taaki navigate kaam kare
    const tabs = [
        { name: "Problems", icon: <Microscope size={18} />, path: "/user/questions" },
        { name: "Collections", icon: <BarChart3 size={18} />, path: "/user/collections" },
        { name: "Contest", icon: <Swords size={18} />, path: "/user/contests" },
        { name: "Toppers", icon: <Trophy size={18} />, path: "/user/toppers" }
    ];

    return (
        <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            
            {/* 1. Tab Switcher Container */}
            <div className="pt-32 flex justify-center sticky top-0 bg-transparent z-50 pointer-events-none">
                <div className="inline-flex items-center gap-1 p-1 bg-[#0A0A0A]/80 backdrop-blur-md rounded-lg border border-zinc-800 scale-90 md:scale-100 w-max shadow-2xl pointer-events-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => navigate(tab.path)} // Click par path badlega
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[11px] font-bold transition-all whitespace-nowrap ${
                                activeTab === tab.name
                                ? "bg-zinc-800 text-white shadow-sm"
                                : "text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-10 relative">
                
                {/* 2. Hero Section (Tree + Heading + Button) */}
                <div className="flex items-end justify-start mt-[-155px] w-full min-h-[280px] relative overflow-visible z-20">
                    
                    {/* Tree Animation */}
                    <div className="flex-none -ml-8 -mb-2 overflow-visible">
                        <TreeAnimation activeTab={activeTab} />
                    </div>

                    {/* Dynamic Heading */}
                    <div className="mb-6 -ml-16 z-40 relative">
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <h1 className="text-3xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white via-white/80 to-orange-600 bg-clip-text text-transparent leading-none">
                                {title}
                            </h1>
                        </motion.div>
                    </div>

                    <div className="flex-grow" />

                    {/* Dynamic Action Button (Add Question / Create Collection) */}
                    <div className="mb-6 mr-4">
                        {actionButton}
                    </div>
                </div>

                {/* 3. Search & Filters Bar (Compact Design) */}

{/* 3. Search & Filters Bar */}
<div className="flex flex-col md:flex-row items-center p-1 bg-[#18181B] border border-zinc-700 rounded-2xl">
    
    {/* HIGHLIGHT: Agar hideSearch true nahi hai, tabhi search bar dikhao */}
    {!hideSearch && (
        <div className="relative flex-grow group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500" size={16} />
            <input 
                placeholder={`Search ${title.toLowerCase()}...`} 
                className="w-full bg-black border border-zinc-900 py-2 pl-10 pr-4 rounded-xl outline-none text-[11px] focus:border-zinc-700 transition-all text-white" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
        </div>
    )}

    {/* Dynamic Filter Bar */}
    {filterBar && (
        <div className={`flex gap-2 w-full px-1 ${hideSearch ? 'justify-center py-1' : 'md:w-auto'}`}>
            {filterBar}
        </div>
    )}
</div>

                {/* 4. Main Page Content (Table, Cards etc.) */}
                <div className="mt-4">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;




//  <div className="flex flex-col md:flex-row items-center p-1 bg-[#18181B] border border-zinc-700 rounded-2xl">
//                     {/* Search Input (Humesha dikhega) */}
//                     <div className="relative flex-grow group">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500" size={16} />
//                         <input 
//                             placeholder={`Search ${title.toLowerCase()}...`} 
//                             className="w-full bg-black border border-zinc-900 py-2 pl-10 pr-4 rounded-xl outline-none text-[11px] focus:border-zinc-700 transition-all text-white" 
//                             value={searchTerm} 
//                             onChange={(e) => setSearchTerm(e.target.value)} 
//                         />
//                     </div>

//                     {/* Dynamic Filter Bar (Sirf tab dikhega jab bhejenge) */}
//                     {filterBar && (
//                         <div className="flex gap-2 w-full md:w-auto px-1">
//                             {filterBar}
//                         </div>
//                     )}
//                 </div>