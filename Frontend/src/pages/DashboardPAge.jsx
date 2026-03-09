// WORKING
// import React, { useState, useEffect, useNavigate } from 'react';
// import { Search, Filter, CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
// import { Input, Button } from '../components';
// import { getAllProblemsService, deleteProblemService } from '../services/problem.services';
// import toast from 'react-hot-toast';
// import { useUserContext } from '../contexts/UserContext';



// const DashboardPage = () => {

//     const { user } = useUserContext();

//     const [problems, setProblems] = useState([]);
//     const [filteredProblems, setFilteredProblems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Filter states
//     const [searchTerm, setSearchTerm] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("All");

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await getAllProblemsService();
//                 setProblems(response.problems || []);
//                 setFilteredProblems(response.problems || []);
//             } catch (err) {
//                 toast.error("Failed to fetch problems");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProblems();
//     }, []);

//     // Filter Logic
//     useEffect(() => {
//         let result = problems;

//         if (searchTerm) {
//             result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
//         }

//         if (difficultyFilter !== "All") {
//             result = result.filter(p => p.difficulty === difficultyFilter);
//         }

//         setFilteredProblems(result);
//     }, [searchTerm, difficultyFilter, problems]);

//     const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this challenge?")) {
//         try {
//             await deleteProblemService(id);
//             toast.success("Problem removed");
//             // Screen se turant hatane ke liye
//             setProblems(prev => prev.filter(p => p._id !== id));
//         } catch (err) {
//             toast.error("Delete failed");
//         }
//     }
// };

//     return (
//         <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 md:px-20 font-sans">
//             <div className="max-w-7xl mx-auto">

//                 {/* Search & Filter Bar */}
//                 <div className="flex flex-col md:flex-row gap-4 mb-10">
//                     <div className="flex-grow">
//                         <Input
//                             placeholder="Search by title..."
//                             leftIcon={<Search size={18} />}
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <div className="flex gap-2">
//                         {["All", "Easy", "Medium", "Hard"].map(level => (
//                             <button
//                                 key={level}
//                                 onClick={() => setDifficultyFilter(level)}
//                                 className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${difficultyFilter === level
//                                         ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/40"
//                                         : "bg-white/5 border-white/10 text-zinc-500 hover:text-white"
//                                     }`}
//                             >
//                                 {level}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Table Layout */}
// <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
//                 <table className="w-full text-left">
//                     <thead>
//                         <tr className="bg-white/5 border-b border-white/5 text-[11px] font-black uppercase tracking-[2px] text-zinc-500">
//                             <th className="px-8 py-5">Status</th>
//                             <th className="px-8 py-5">Problem Title</th>
//                             <th className="px-8 py-5 text-right">Difficulty / Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-white/5">
//                         {filteredProblems.map((problem) => (
//                             <tr key={problem._id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">

//                                 {/* 1. Status Column */}
//                                 <td className="px-8 py-6">
//                                     <Circle size={20} className="text-zinc-800 group-hover:text-zinc-600" />
//                                 </td>

//                                 {/* 2. Title Column */}
//                                 <td className="px-8 py-6">
//                                     <h3 className="text-zinc-200 font-semibold group-hover:text-white transition-colors">
//                                         {problem.title}
//                                     </h3>
//                                     <div className="flex gap-2 mt-1">
//                                         {problem.tags?.map(tag => (
//                                             <span key={tag} className="text-[9px] text-zinc-600 uppercase font-black">{tag}</span>
//                                         ))}
//                                     </div>
//                                 </td>

//                                 {/* 3. Difficulty & Admin Actions Column */}
//                                 <td className="px-8 py-6 text-right">
//                                     <div className="flex items-center justify-end gap-4">
//                                         <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${
//                                             problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
//                                             problem.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
//                                             'bg-red-500/10 text-red-500'
//                                         }`}>
//                                             {problem.difficulty}
//                                         </span>

//                                         {/* Admin specific buttons */}
//                                         {user?.role === 'admin' && (
//                                             <div className="flex gap-2 border-l border-white/10 pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                                                 <button
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         navigate(`/admin/edit-problem/${problem._id}`);
//                                                     }}
//                                                     className="p-2 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-colors"
//                                                 >
//                                                     <Edit2 size={16} />
//                                                 </button>
//                                                 <button
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         handleDelete(problem._id);
//                                                     }}
//                                                     className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
//                                                 >
//                                                     <Trash2 size={16} />
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                     {filteredProblems.length === 0 && (
//                         <div className="py-20 text-center text-zinc-600 font-medium">No problems found match your search.</div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, Circle, Edit2, Trash2, ChevronDown, ChevronUp, Tag } from 'lucide-react';
// import { Input } from '../components';
// import { getAllProblemsService, deleteProblemService } from '../services/problem.services';
// import toast from 'react-hot-toast';
// import { useUserContext } from '../contexts/UserContext';

// const DashboardPage = () => {
//     const navigate = useNavigate();
//     const { user } = useUserContext();

//     const [problems, setProblems] = useState([]);
//     const [filteredProblems, setFilteredProblems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Filter states
//     const [searchTerm, setSearchTerm] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("All");
//     const [tagFilter, setTagFilter] = useState("All");
//     const [isTagsExpanded, setIsTagsExpanded] = useState(false);

//     const availableTags = [
//         "Array", "String", "HashTable", "Math", "Dynamic Programming", 
//         "Graph", "Stack", "Linked List", "Monotonic Stack", 
//         "Binary Tree", "Binary Search Tree", "Topological Sort", 
//         "Doubly-Linked List", "Minimum Spanning Tree"
//     ];

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await getAllProblemsService();
//                 setProblems(response.problems || []);
//                 setFilteredProblems(response.problems || []);
//             } catch (err) {
//                 toast.error("Failed to fetch problems");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProblems();
//     }, []);

//     // Enhanced Filter Logic
//     useEffect(() => {
//         let result = problems;

//         if (searchTerm) {
//             result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
//         }

//         if (difficultyFilter !== "All") {
//             result = result.filter(p => p.difficulty === difficultyFilter);
//         }

//         if (tagFilter !== "All") {
//             result = result.filter(p => p.tags?.includes(tagFilter));
//         }

//         setFilteredProblems(result);
//     }, [searchTerm, difficultyFilter, tagFilter, problems]);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this challenge?")) {
//             try {
//                 await deleteProblemService(id);
//                 toast.success("Problem removed");
//                 setProblems(prev => prev.filter(p => p._id !== id));
//             } catch (err) {
//                 toast.error("Delete failed");
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 md:px-20 font-sans text-zinc-300">
//             <div className="max-w-7xl mx-auto">

//                 {/* 1. Expandable Tags Section (LeetCode Style) */}
//                 <div className="mb-8 bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all">
//                     <button 
//                         onClick={() => setIsTagsExpanded(!isTagsExpanded)}
//                         className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors"
//                     >
//                         <Tag size={16} className="text-orange-500"/>
//                         Browse by Topics
//                         {isTagsExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
//                     </button>

//                     {isTagsExpanded && (
//                         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
//                             <button 
//                                 onClick={() => setTagFilter("All")}
//                                 className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${tagFilter === "All" ? "bg-orange-600 border-orange-600 text-white" : "bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10"}`}
//                             >
//                                 All Topics
//                             </button>
//                             {availableTags.map(tag => (
//                                 <button 
//                                     key={tag}
//                                     onClick={() => setTagFilter(tag)}
//                                     className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${tagFilter === tag ? "bg-orange-600 border-orange-600 text-white" : "bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10"}`}
//                                 >
//                                     {tag}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* 2. Search & Difficulty Dropdown */}

// <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

//     {/* Search Bar - Controlled Width */}
//     <div className="w-full md:max-w-md"> {/* Yahan max-w-md se length control ho rahi hai */}
//         <Input
//             placeholder="Search by title..."
//             leftIcon={<Search size={18} />}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="bg-white/5 border-white/10 focus:border-orange-500"
//         />
//     </div>

//     {/* Difficulty Dropdown */}
//     <div className="relative w-full md:w-48">
//         <select 
//             value={difficultyFilter}
//             onChange={(e) => setDifficultyFilter(e.target.value)}
//             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-zinc-300 appearance-none focus:border-orange-500 outline-none cursor-pointer"
//         >
//             <option value="All" className="bg-[#111]">Difficulty: All</option>
//             <option value="Easy" className="bg-[#111]">Easy</option>
//             <option value="Medium" className="bg-[#111]">Medium</option>
//             <option value="Hard" className="bg-[#111]">Hard</option>
//         </select>
//         <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
//     </div>
// </div>

//                 {/* Table Layout */}
//                 <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
//                     <table className="w-full text-left">
//                         <thead>
//                             <tr className="bg-white/5 border-b border-white/5 text-[11px] font-black uppercase tracking-[2px] text-zinc-500">
//                                 <th className="px-8 py-5">Status</th>
//                                 <th className="px-8 py-5">Problem Title</th>
//                                 <th className="px-8 py-5 text-right">Difficulty / Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/5">
//                             {filteredProblems.map((problem) => (
//                                 <tr key={problem._id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
//                                     <td className="px-8 py-6">
//                                         <Circle size={20} className="text-zinc-800 group-hover:text-zinc-600" />
//                                     </td>
//                                     <td className="px-8 py-6">
//                                         <h3 className="text-zinc-200 font-semibold group-hover:text-white transition-colors">
//                                             {problem.title}
//                                         </h3>
//                                         <div className="flex gap-2 mt-1">
//                                             {problem.tags?.map(tag => (
//                                                 <span key={tag} className="text-[9px] text-zinc-600 uppercase font-black">{tag}</span>
//                                             ))}
//                                         </div>
//                                     </td>
//                                     <td className="px-8 py-6 text-right">
//                                         <div className="flex items-center justify-end gap-4">
//                                             <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${
//                                                 problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
//                                                 problem.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
//                                                 'bg-red-500/10 text-red-500'
//                                             }`}>
//                                                 {problem.difficulty}
//                                             </span>

//                                             {user?.role === 'admin' && (
//                                                 <div className="flex gap-2 border-l border-white/10 pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                                                     <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-problem/${problem._id}`); }} className="p-2 hover:bg-orange-500/20 text-orange-500 rounded-lg">
//                                                         <Edit2 size={16} />
//                                                     </button>
//                                                     <button onClick={(e) => { e.stopPropagation(); handleDelete(problem._id); }} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg">
//                                                         <Trash2 size={16} />
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     {filteredProblems.length === 0 && (
//                         <div className="py-20 text-center text-zinc-600 font-medium">No problems found match your search.</div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, Circle, Edit2, Trash2, ChevronDown, ChevronUp, Tag } from 'lucide-react';
// import { Input } from '../components';
// import { getAllProblemsService, deleteProblemService } from '../services/problem.services';
// import toast from 'react-hot-toast';
// import { useUserContext } from '../contexts/UserContext';

// const DashboardPage = () => {
//     const navigate = useNavigate();
//     const { user } = useUserContext();

//     const [problems, setProblems] = useState([]);
//     const [filteredProblems, setFilteredProblems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Filter states
//     const [searchTerm, setSearchTerm] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("All");
//     const [tagFilter, setTagFilter] = useState("All");
//     const [isTagsExpanded, setIsTagsExpanded] = useState(false);

//     const availableTags = [
//         "Array", "String", "HashTable", "Math", "Dynamic Programming", 
//         "Graph", "Stack", "Linked List", "Monotonic Stack", 
//         "Binary Tree", "Binary Search Tree", "Topological Sort", 
//         "Doubly-Linked List", "Minimum Spanning Tree"
//     ];

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await getAllProblemsService();
//                 setProblems(response.problems || []);
//                 setFilteredProblems(response.problems || []);
//             } catch (err) {
//                 toast.error("Failed to fetch problems");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProblems();
//     }, []);

//     // Filter Logic
//     useEffect(() => {
//         let result = problems;

//         if (searchTerm) {
//             result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
//         }

//         if (difficultyFilter !== "All") {
//             result = result.filter(p => p.difficulty === difficultyFilter);
//         }

//         if (tagFilter !== "All") {
//             result = result.filter(p => p.tags?.includes(tagFilter));
//         }

//         setFilteredProblems(result);
//     }, [searchTerm, difficultyFilter, tagFilter, problems]);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this challenge?")) {
//             try {
//                 await deleteProblemService(id);
//                 toast.success("Problem removed");
//                 setProblems(prev => prev.filter(p => p._id !== id));
//             } catch (err) {
//                 toast.error("Delete failed");
//             }
//         }
//     };

//     if (loading) return <div className="min-h-screen bg-[#0a0a0a] pt-32 text-center text-white">Loading Challenges...</div>;

//     return (
//         <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 md:px-20 font-sans text-zinc-300">
//             <div className="max-w-7xl mx-auto">

//                 {/* Filters Row: Search + Difficulty + Browse Topics aligned in one line */}
//                 <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">

//                     {/* 1. Search Bar - Width Restricted */}
//                     <div className="w-full lg:w-[320px]">
//                         <Input
//                             placeholder="Search by title..."
//                             leftIcon={<Search size={18} />}
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="bg-white/5 border-white/10 focus:border-orange-500 py-2.5"
//                         />
//                     </div>

//                     {/* 2. Difficulty Dropdown */}
//                     <div className="relative w-full lg:w-48">
//                         <select 
//                             value={difficultyFilter}
//                             onChange={(e) => setDifficultyFilter(e.target.value)}
//                             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-300 appearance-none focus:border-orange-500 outline-none cursor-pointer"
//                         >
//                             <option value="All" className="bg-[#111]">Difficulty: All</option>
//                             <option value="Easy" className="bg-[#111]">Easy</option>
//                             <option value="Medium" className="bg-[#111]">Medium</option>
//                             <option value="Hard" className="bg-[#111]">Hard</option>
//                         </select>
//                         <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
//                     </div>

//                     {/* 3. Browse Topics Button */}
//                     <div className="w-full lg:w-auto">
//                         <button 
//                             onClick={() => setIsTagsExpanded(!isTagsExpanded)}
//                             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all w-full lg:w-auto justify-center ${
//                                 isTagsExpanded 
//                                 ? "bg-orange-600/10 border-orange-500 text-orange-500" 
//                                 : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
//                             }`}
//                         >
//                             <Tag size={16}/>
//                             Browse Topics
//                             {isTagsExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Expandable Tags Grid */}
//                 {isTagsExpanded && (
//                     <div className="mb-8 bg-white/[0.02] border border-white/5 rounded-3xl p-6 animate-in fade-in slide-in-from-top-4 duration-300">
//                         <div className="flex flex-wrap gap-2">
//                             <button 
//                                 onClick={() => setTagFilter("All")}
//                                 className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${
//                                     tagFilter === "All" ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/20" : "bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10"
//                                 }`}
//                             >
//                                 All Topics
//                             </button>
//                             {availableTags.map(tag => (
//                                 <button 
//                                     key={tag}
//                                     onClick={() => setTagFilter(tag)}
//                                     className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all ${
//                                         tagFilter === tag ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/20" : "bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10"
//                                     }`}
//                                 >
//                                     {tag}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Table Layout */}
//                 <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
//                     <table className="w-full text-left">
//                         <thead>
//                             <tr className="bg-white/5 border-b border-white/5 text-[11px] font-black uppercase tracking-[2px] text-zinc-500">
//                                 <th className="px-8 py-5">Status</th>
//                                 <th className="px-8 py-5">Problem Title</th>
//                                 <th className="px-8 py-5 text-right">Difficulty / Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/5">
//                             {filteredProblems.map((problem) => (
//                                 <tr key={problem._id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => navigate(`/problem/${problem._id}`)}>
//                                     <td className="px-8 py-6">
//                                         <Circle size={20} className="text-zinc-800 group-hover:text-zinc-600" />
//                                     </td>
//                                     <td className="px-8 py-6">
//                                         <h3 className="text-zinc-200 font-semibold group-hover:text-white transition-colors">
//                                             {problem.title}
//                                         </h3>
//                                         <div className="flex gap-2 mt-1">
//                                             {problem.tags?.map(tag => (
//                                                 <span key={tag} className="text-[9px] text-zinc-600 uppercase font-black">{tag}</span>
//                                             ))}
//                                         </div>
//                                     </td>
//                                     <td className="px-8 py-6 text-right">
//                                         <div className="flex items-center justify-end gap-4">
//                                             <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${
//                                                 problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
//                                                 problem.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500' :
//                                                 'bg-red-500/10 text-red-500'
//                                             }`}>
//                                                 {problem.difficulty}
//                                             </span>

//                                             {user?.role === 'admin' && (
//                                                 <div className="flex gap-2 border-l border-white/10 pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-problem/${problem._id}`); }} 
//                                                         className="p-2 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-colors"
//                                                     >
//                                                         <Edit2 size={16} />
//                                                     </button>
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); handleDelete(problem._id); }} 
//                                                         className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
//                                                     >
//                                                         <Trash2 size={16} />
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     {filteredProblems.length === 0 && (
//                         <div className="py-20 text-center text-zinc-600 font-medium">No problems found match your search.</div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, CheckCircle2, Circle, Edit3, Trash2, ChevronDown, ChevronUp, Layers, Zap } from 'lucide-react';
// import { Input } from '../components';
// import { getAllProblemsService, deleteProblemService } from '../services/problem.services';
// import toast from 'react-hot-toast';
// import { useUserContext } from '../contexts/UserContext';

// const DashboardPage = () => {
//     const navigate = useNavigate();
//     const { user } = useUserContext();

//     const [problems, setProblems] = useState([]);
//     const [filteredProblems, setFilteredProblems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("All");
//     const [tagFilter, setTagFilter] = useState("All");
//     const [isTagsExpanded, setIsTagsExpanded] = useState(false);

//     const availableTags = [
//         "Array", "String", "HashTable", "Math", "Dynamic Programming", 
//         "Graph", "Stack", "Linked List", "Monotonic Stack", 
//         "Binary Tree", "Binary Search Tree", "Topological Sort", 
//         "Doubly-Linked List", "Minimum Spanning Tree"
//     ];

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await getAllProblemsService();
//                 setProblems(response.problems || []);
//                 setFilteredProblems(response.problems || []);
//             } catch (err) {
//                 toast.error("Failed to fetch problems");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProblems();
//     }, []);

//     useEffect(() => {
//         let result = problems;
//         if (searchTerm) result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
//         if (difficultyFilter !== "All") result = result.filter(p => p.difficulty === difficultyFilter);
//         if (tagFilter !== "All") result = result.filter(p => p.tags?.includes(tagFilter));
//         setFilteredProblems(result);
//     }, [searchTerm, difficultyFilter, tagFilter, problems]);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this challenge?")) {
//             try {
//                 await deleteProblemService(id);
//                 toast.success("Problem removed");
//                 setProblems(prev => prev.filter(p => p._id !== id));
//             } catch (err) {
//                 toast.error("Delete failed");
//             }
//         }
//     };

//     if (loading) return (
//         <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 md:px-12 lg:px-20 font-sans text-zinc-100">
//             <div className="max-w-7xl mx-auto">

//                 {/* Header Section */}
//                 <div className="mb-10 flex flex-col gap-2">
//                     <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
//                         <Zap className="text-orange-500 fill-orange-500" size={28}/> 
//                         CHALLENGES
//                     </h1>
//                     <p className="text-zinc-500 text-sm">Master your coding skills with curated problems.</p>
//                 </div>

//                 {/* Glassy Filter Row */}
//                 <div className="flex flex-col lg:flex-row items-center gap-4 mb-8 bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">

//                     {/* Search */}
//                     <div className="w-full lg:flex-grow">
//                         <div className="relative group">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={18}/>
//                             <input
//                                 placeholder="Search challenges..."
//                                 className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-4 rounded-xl outline-none focus:border-orange-500/50 transition-all text-sm"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     {/* Difficulty Select */}
//                     <div className="relative w-full lg:w-48">
//                         <select 
//                             value={difficultyFilter}
//                             onChange={(e) => setDifficultyFilter(e.target.value)}
//                             className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold appearance-none focus:border-orange-500/50 outline-none cursor-pointer"
//                         >
//                             <option value="All">Difficulty: All</option>
//                             <option value="Easy">Easy</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Hard">Hard</option>
//                         </select>
//                         <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
//                     </div>

//                     {/* Browse Topics Button */}
//                     <button 
//                         onClick={() => setIsTagsExpanded(!isTagsExpanded)}
//                         className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all w-full lg:w-auto justify-center ${
//                             isTagsExpanded 
//                             ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" 
//                             : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
//                         }`}
//                     >
//                         <Layers size={16}/>
//                         Topics
//                         {isTagsExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
//                     </button>
//                 </div>

//                 {/* Expandable Topic Pills */}
//                 {isTagsExpanded && (
//                     <div className="mb-8 p-6 bg-white/[0.01] border border-white/5 rounded-3xl animate-in fade-in zoom-in-95 duration-300">
//                         <div className="flex flex-wrap gap-2">
//                             <button 
//                                 onClick={() => setTagFilter("All")}
//                                 className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
//                                     tagFilter === "All" ? "bg-orange-500 text-white" : "bg-white/5 text-zinc-500 hover:text-zinc-300"
//                                 }`}
//                             >
//                                 All
//                             </button>
//                             {availableTags.map(tag => (
//                                 <button 
//                                     key={tag}
//                                     onClick={() => setTagFilter(tag)}
//                                     className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
//                                         tagFilter === tag ? "bg-orange-500 text-white" : "bg-white/5 text-zinc-500 hover:text-zinc-300 border border-white/5"
//                                     }`}
//                                 >
//                                     {tag}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Main Problems Table */}
//                 <div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
//                                 <th className="px-8 py-5 w-20">Status</th>
//                                 <th className="px-4 py-5">Challenge</th>
//                                 <th className="px-8 py-5 text-right">Metrics / Control</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/[0.03]">
//                             {filteredProblems.map((problem) => (
//                                 <tr 
//                                     key={problem._id} 
//                                     className="group hover:bg-white/[0.01] transition-all cursor-pointer"
//                                     onClick={() => navigate(`/problem/${problem._id}`)}
//                                 >
//                                     {/* Status Icon */}
//                                     <td className="px-8 py-6 text-center">
//                                         <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:border-orange-500/50 transition-colors">
//                                             <Circle size={14} className="text-zinc-700 group-hover:text-orange-500 transition-colors" />
//                                         </div>
//                                     </td>

//                                     {/* Title & Tags */}
//                                     <td className="px-4 py-6">
//                                         <div className="flex flex-col gap-2">
//                                             <span className="text-[17px] font-bold text-zinc-200 group-hover:text-white transition-colors">
//                                                 {problem.title}
//                                             </span>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {problem.tags?.map(tag => (
//                                                     <span key={tag} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-tighter border border-blue-500/10">
//                                                         {tag}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </td>

//                                     {/* Difficulty & Actions */}
//                                     <td className="px-8 py-6">
//                                         <div className="flex items-center justify-end gap-6">
//                                             <span className={`text-[11px] font-black uppercase tracking-tighter px-3 py-1 rounded-full border ${
//                                                 problem.difficulty === 'Easy' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' :
//                                                 problem.difficulty === 'Medium' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' :
//                                                 'bg-rose-500/5 border-rose-500/20 text-rose-400'
//                                             }`}>
//                                                 {problem.difficulty}
//                                             </span>

//                                             {user?.role === 'admin' && (
//                                                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-problem/${problem._id}`); }} 
//                                                         className="p-2.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all"
//                                                     >
//                                                         <Edit3 size={18} />
//                                                     </button>
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); handleDelete(problem._id); }} 
//                                                         className="p-2.5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-500 rounded-xl transition-all"
//                                                     >
//                                                         <Trash2 size={18} />
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {filteredProblems.length === 0 && (
//                         <div className="py-24 text-center">
//                             <div className="text-zinc-600 font-medium text-lg">No challenges found.</div>
//                             <p className="text-zinc-700 text-sm">Try adjusting your filters or search term.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, Circle, Edit3, Trash2, ChevronDown, ChevronUp, Layers, Zap } from 'lucide-react';
// import { getAllProblemsService, deleteProblemService } from '../services/problem.services';
// import toast from 'react-hot-toast';
// import { useUserContext } from '../contexts/UserContext';

// const DashboardPage = () => {
//     const navigate = useNavigate();
//     const { user } = useUserContext();

//     const [problems, setProblems] = useState([]);
//     const [filteredProblems, setFilteredProblems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("All");
//     const [tagFilter, setTagFilter] = useState("All");
//     const [isTagsExpanded, setIsTagsExpanded] = useState(false);

//     const availableTags = [
//         "Array", "String", "HashTable", "Math", "Dynamic Programming", 
//         "Graph", "Stack", "Linked List", "Monotonic Stack", 
//         "Binary Tree", "Binary Search Tree", "Topological Sort", 
//         "Doubly-Linked List", "Minimum Spanning Tree"
//     ];

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await getAllProblemsService();
//                 setProblems(response.problems || []);
//                 setFilteredProblems(response.problems || []);
//             } catch (err) {
//                 toast.error("Failed to fetch problems");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProblems();
//     }, []);

//     useEffect(() => {
//         let result = problems;
//         if (searchTerm) result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
//         if (difficultyFilter !== "All") result = result.filter(p => p.difficulty === difficultyFilter);
//         if (tagFilter !== "All") result = result.filter(p => p.tags?.includes(tagFilter));
//         setFilteredProblems(result);
//     }, [searchTerm, difficultyFilter, tagFilter, problems]);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this challenge?")) {
//             try {
//                 await deleteProblemService(id);
//                 toast.success("Problem removed");
//                 setProblems(prev => prev.filter(p => p._id !== id));
//             } catch (err) {
//                 toast.error("Delete failed");
//             }
//         }
//     };

//     if (loading) return (
//         <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 md:px-12 lg:px-20 font-sans text-zinc-100">
//             <div className="max-w-7xl mx-auto">

//                 {/* Header Section */}
//                 <div className="mb-10 flex flex-col gap-2">
//                     <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
//                         <Zap className="text-orange-500 fill-orange-500" size={28}/> 
//                         CHALLENGES
//                     </h1>
//                     <p className="text-zinc-500 text-sm">Master your coding skills with curated problems.</p>
//                 </div>

//                 {/* Glassy Filter Row */}
//                 <div className="flex flex-col lg:flex-row items-center gap-4 mb-8 bg-white/[0.02] p-4 rounded-2xl border border-white/5 backdrop-blur-md">
//                     <div className="w-full lg:flex-grow">
//                         <div className="relative group">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={18}/>
//                             <input
//                                 placeholder="Search challenges..."
//                                 className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-4 rounded-xl outline-none focus:border-orange-500/50 transition-all text-sm"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="relative w-full lg:w-48">
//                         <select 
//                             value={difficultyFilter}
//                             onChange={(e) => setDifficultyFilter(e.target.value)}
//                             className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold appearance-none focus:border-orange-500/50 outline-none cursor-pointer"
//                         >
//                             <option value="All">Difficulty: All</option>
//                             <option value="Easy">Easy</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Hard">Hard</option>
//                         </select>
//                         <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
//                     </div>

//                     <button 
//                         onClick={() => setIsTagsExpanded(!isTagsExpanded)}
//                         className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all w-full lg:w-auto justify-center ${
//                             isTagsExpanded 
//                             ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" 
//                             : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
//                         }`}
//                     >
//                         <Layers size={16}/>
//                         Topics
//                         {isTagsExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
//                     </button>
//                 </div>

//                 {isTagsExpanded && (
//                     <div className="mb-8 p-6 bg-white/[0.01] border border-white/5 rounded-3xl animate-in fade-in zoom-in-95 duration-300">
//                         <div className="flex flex-wrap gap-2">
//                             <button 
//                                 onClick={() => setTagFilter("All")}
//                                 className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
//                                     tagFilter === "All" ? "bg-orange-500 text-white" : "bg-white/5 text-zinc-500 hover:text-zinc-300"
//                                 }`}
//                             >
//                                 All
//                             </button>
//                             {availableTags.map(tag => (
//                                 <button 
//                                     key={tag}
//                                     onClick={() => setTagFilter(tag)}
//                                     className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
//                                         tagFilter === tag ? "bg-orange-500 text-white" : "bg-white/5 text-zinc-500 hover:text-zinc-300 border border-white/5"
//                                     }`}
//                                 >
//                                     {tag}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Main Problems Table - Background set to #0c0c0c */}
//                 <div className="bg-[#0c0c0c] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
//                                 <th className="px-8 py-5 w-20">Status</th>
//                                 <th className="px-4 py-5">Challenge</th>
//                                 <th className="px-8 py-5 text-right">Difficulty / Control</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/[0.03]">
//                             {filteredProblems.map((problem) => (
//                                 <tr 
//                                     key={problem._id} 
//                                     className="group hover:bg-white/[0.01] transition-all cursor-pointer"
//                                     onClick={() => navigate(`/problem/${problem._id}`)}
//                                 >
//                                     <td className="px-8 py-6 text-center">
//                                         <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:border-orange-500/50 transition-colors">
//                                             <Circle size={14} className="text-zinc-700 group-hover:text-orange-500 transition-colors" />
//                                         </div>
//                                     </td>

//                                     <td className="px-4 py-6">
//                                         <div className="flex flex-col gap-2">
//                                             <span className="text-[17px] font-bold text-zinc-200 group-hover:text-white transition-colors">
//                                                 {problem.title}
//                                             </span>
//                                             {/* Highlighted Tags for differentiation */}
//                                             <div className="flex flex-wrap gap-2">
//                                                 {problem.tags?.map(tag => (
//                                                     <span key={tag} className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] font-black uppercase tracking-wider">
//                                                         {tag}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </td>

//                                     <td className="px-8 py-6">
//                                         <div className="flex items-center justify-end gap-6">
//                                             {/* Simple Difficulty Text (No rounded box) */}
//                                             <span className={`text-[11px] font-black uppercase tracking-widest ${
//                                                 problem.difficulty === 'Easy' ? 'text-emerald-500' :
//                                                 problem.difficulty === 'Medium' ? 'text-amber-500' :
//                                                 'text-rose-500'
//                                             }`}>
//                                                 {problem.difficulty}
//                                             </span>

//                                             {user?.role === 'admin' && (
//                                                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-problem/${problem._id}`); }} 
//                                                         className="p-2.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all"
//                                                     >
//                                                         <Edit3 size={18} />
//                                                     </button>
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); handleDelete(problem._id); }} 
//                                                         className="p-2.5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-500 rounded-xl transition-all"
//                                                     >
//                                                         <Trash2 size={18} />
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, Circle, Edit3, Trash2, ChevronDown, ChevronUp, Layers, Zap } from 'lucide-react';
// import { getAllProblemsService, deleteProblemService } from '../services/problem.services';
// import toast from 'react-hot-toast';
// import { useUserContext } from '../contexts/UserContext';

// const DashboardPage = () => {
//     const navigate = useNavigate();
//     const { user } = useUserContext();

//     const [problems, setProblems] = useState([]);
//     const [filteredProblems, setFilteredProblems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("All");
//     const [tagFilter, setTagFilter] = useState("All");
//     const [isTagsExpanded, setIsTagsExpanded] = useState(false);

//     const availableTags = [
//         "Array", "String", "HashTable", "Math", "Dynamic Programming", 
//         "Graph", "Stack", "Linked List", "Monotonic Stack", 
//         "Binary Tree", "Binary Search Tree", "Topological Sort", 
//         "Doubly-Linked List", "Minimum Spanning Tree"
//     ];

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await getAllProblemsService();
//                 setProblems(response.problems || []);
//                 setFilteredProblems(response.problems || []);
//             } catch (err) {
//                 toast.error("Failed to fetch problems");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProblems();
//     }, []);

//     useEffect(() => {
//         let result = problems;
//         if (searchTerm) result = result.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
//         if (difficultyFilter !== "All") result = result.filter(p => p.difficulty === difficultyFilter);
//         if (tagFilter !== "All") result = result.filter(p => p.tags?.includes(tagFilter));
//         setFilteredProblems(result);
//     }, [searchTerm, difficultyFilter, tagFilter, problems]);

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this challenge?")) {
//             try {
//                 await deleteProblemService(id);
//                 toast.success("Problem removed");
//                 setProblems(prev => prev.filter(p => p._id !== id));
//             } catch (err) {
//                 toast.error("Delete failed");
//             }
//         }
//     };

//     if (loading) return (
//         <div className="min-h-screen bg-black flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#d85c8a]"></div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-16 font-sans text-zinc-100">
//             <div className="max-w-7xl mx-auto">

//                 {/* Header Section */}
//                 <div className="mb-10 flex flex-col gap-2">
//                     <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
//                         <Zap className="text-[#d85c8a] fill-[#d85c8a]" size={28}/> 
//                         CHALLENGES
//                     </h1>
//                     <p className="text-zinc-500 text-sm">Master your coding skills with curated problems.</p>
//                 </div>

//                 {/* Filter Row: Glassy Background like FourthPage */}
//                 <div className="flex flex-col lg:flex-row items-center gap-4 mb-8 bg-[#111827] border border-white/5 p-4 rounded-2xl shadow-lg">
//                     <div className="w-full lg:flex-grow">
//                         <div className="relative group">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#d85c8a] transition-colors" size={18}/>
//                             <input
//                                 placeholder="Search challenges..."
//                                 className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-4 rounded-xl outline-none focus:border-[#d85c8a]/50 transition-all text-sm"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div className="relative w-full lg:w-48">
//                         <select 
//                             value={difficultyFilter}
//                             onChange={(e) => setDifficultyFilter(e.target.value)}
//                             className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold appearance-none focus:border-[#d85c8a]/50 outline-none cursor-pointer"
//                         >
//                             <option value="All">Difficulty: All</option>
//                             <option value="Easy">Easy</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Hard">Hard</option>
//                         </select>
//                         <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
//                     </div>

//                     <button 
//                         onClick={() => setIsTagsExpanded(!isTagsExpanded)}
//                         className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all w-full lg:w-auto justify-center ${
//                             isTagsExpanded 
//                             ? "bg-[#d85c8a] border-[#d85c8a] text-black shadow-lg shadow-[#d85c8a]/20" 
//                             : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
//                         }`}
//                     >
//                         <Layers size={16}/>
//                         Topics
//                         {isTagsExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
//                     </button>
//                 </div>

//                 {isTagsExpanded && (
//                     <div className="mb-8 p-6 bg-[#111827]/50 border border-white/5 rounded-3xl animate-in fade-in zoom-in-95 duration-300">
//                         <div className="flex flex-wrap gap-2">
//                             <button 
//                                 onClick={() => setTagFilter("All")}
//                                 className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
//                                     tagFilter === "All" ? "bg-[#d85c8a] text-black" : "bg-white/5 text-zinc-500 hover:text-zinc-300"
//                                 }`}
//                             >
//                                 All
//                             </button>
//                             {availableTags.map(tag => (
//                                 <button 
//                                     key={tag}
//                                     onClick={() => setTagFilter(tag)}
//                                     className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
//                                         tagFilter === tag ? "bg-[#d85c8a] text-black" : "bg-white/5 text-zinc-500 hover:text-zinc-300 border border-white/5"
//                                     }`}
//                                 >
//                                     {tag}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Problems Container: Updated to FourthPage Background style (#111827) */}
//                 <div className="bg-[#111827] border border-white/5 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
//                                 <th className="px-8 py-5 w-20">Status</th>
//                                 <th className="px-4 py-5 text-left">Challenge</th>
//                                 <th className="px-8 py-5 text-right">Metrics</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/[0.03]">
//                             {filteredProblems.map((problem) => (
//                                 <tr 
//                                     key={problem._id} 
//                                     className="group hover:bg-white/[0.01] transition-all cursor-pointer"
//                                     onClick={() => navigate(`/problem/${problem._id}`)}
//                                 >
//                                     <td className="px-8 py-6 text-center">
//                                         <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center bg-black/20 group-hover:border-[#d85c8a]/50 transition-colors">
//                                             <Circle size={14} className="text-zinc-700 group-hover:text-[#d85c8a] transition-colors" />
//                                         </div>
//                                     </td>

//                                     <td className="px-4 py-6">
//                                         <div className="flex flex-col gap-2">
//                                             <span className="text-[17px] font-bold text-zinc-200 group-hover:text-white transition-colors">
//                                                 {problem.title}
//                                             </span>
//                                             {/* Highlighted Tags for differentiation */}
//                                             <div className="flex flex-wrap gap-2">
//                                                 {problem.tags?.map(tag => (
//                                                     <span key={tag} className="px-2 py-0.5 rounded bg-[#d85c8a]/10 text-[#d85c8a] border border-[#d85c8a]/20 text-[9px] font-black uppercase tracking-wider">
//                                                         {tag}
//                                                     </span>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </td>

//                                     <td className="px-8 py-6">
//                                         <div className="flex items-center justify-end gap-6">
//                                             {/* Simple Difficulty Text as requested */}
//                                             <span className={`text-[11px] font-black uppercase tracking-widest ${
//                                                 problem.difficulty === 'Easy' ? 'text-emerald-400' :
//                                                 problem.difficulty === 'Medium' ? 'text-amber-400' :
//                                                 'text-rose-400'
//                                             }`}>
//                                                 {problem.difficulty}
//                                             </span>

//                                             {user?.role === 'admin' && (
//                                                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-problem/${problem._id}`); }} 
//                                                         className="p-2.5 hover:bg-black/40 text-zinc-400 hover:text-white rounded-xl transition-all"
//                                                     >
//                                                         <Edit3 size={18} />
//                                                     </button>
//                                                     <button 
//                                                         onClick={(e) => { e.stopPropagation(); handleDelete(problem._id); }} 
//                                                         className="p-2.5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-500 rounded-xl transition-all"
//                                                     >
//                                                         <Trash2 size={18} />
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;




{/* --- STREAK GAUGE (OPTION 3) --- */ }
{/* <div className="relative z-10 mt-8 flex items-end gap-3 bg-white/[0.03] border border-white/5 p-4 rounded-2xl backdrop-blur-sm">
    <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">System Heat</span>
        <div className="flex items-center gap-2">
           
            <div className="h-10 w-2.5 bg-zinc-800 rounded-full relative overflow-hidden">
                <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "70%" }} // Isse aap dynamic kar sakte hain (solved/total * 100)
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                />
            </div>
           
            <div className="flex flex-col">
                <span className="text-xl font-mono font-black text-orange-500 leading-none">70%</span>
                <span className="text-[9px] text-zinc-500 font-bold uppercase">Optimal Performance</span>
            </div>
        </div>
    </div>

   
    <motion.div
        animate={{ 
            scale: [1, 1.15, 1],
            filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-1"
    >
        <Flame size={32} className="text-orange-500 fill-orange-500/20" />
    </motion.div>
</div> */}

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
                console.log("DASHBOARD DATA:", response);
                
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

                {/* Filter Row (UI fixed from previous preferred version) */}
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



