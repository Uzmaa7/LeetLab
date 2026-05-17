
import axios from "axios";
// 1. Determine the URL based on the environment
const baseURL = import.meta.env.PROD 
  ? (import.meta.env.VITE_PROD_API || "https://portfolio.onrender.com")  // Uses Render link when deployed
  : (import.meta.env.VITE_LOCAL_API || "http://localhost:8080"); // Uses Localhost when running locally

export const api = axios.create({
  baseURL: `${baseURL}/api/v1`, 
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};









//  return (

//         <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-orange-500/30 pt-24 pb-24">

            

//             {/* 1. CENTRAL HEADING & SUBHEADING */}

//             <div className="max-w-4xl mx-auto text-center mb-16 px-6">

//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

//                     <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent leading-none mb-4">

//                         Contest Arena

//                     </h1>

//                     <p className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-orange-500 uppercase">

//                         Compete • Practice • Improve

//                     </p>

//                     <div className="w-12 h-[2px] bg-orange-600 mx-auto mt-6" />

//                 </motion.div>

//             </div>



//             <main className="max-w-6xl mx-auto px-6 space-y-16">

                

//                 {/* 2. ACTION GRID (LEETLAB STYLE) */}

//                 <div className="grid md:grid-cols-2 gap-10">

                    

//                     {/* JOIN CARD */}

//                     <section ref={joinFormRef} className="bg-[#18181B] border border-zinc-800 p-8 rounded-none relative">

//                         <div className="flex items-center gap-3 mb-8">

//                             <Zap size={20} className="text-blue-500" />

//                             <h2 className="text-[10px] font-black text-white uppercase tracking-widest">Join a Contest</h2>

//                         </div>



//                         <form onSubmit={joinContesthandler} className="space-y-6">

//                             <LeetInput 

//                                 label="Contest Code" 

//                                 placeholder="E.G. 7890-XYZ"

//                                 value={contestCode}

//                                 onChange={(e) => setContestCode(e.target.value)}

//                                 required 

//                             />

//                             <LeetButton type="submit" text="Enter Arena" icon={Zap} className="w-full justify-center py-4" />

//                             <p className="text-[10px] text-zinc-600 font-bold uppercase text-center italic">

//                                 Looking for public contests? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/explore')}>Browse here</span>

//                             </p>

//                         </form>

//                     </section>



//                     {/* CREATE CARD */}

//                     <section ref={createFormRef} className="bg-[#18181B] border border-zinc-800 p-8 rounded-none relative overflow-hidden">

//                         <div className="flex items-center gap-3 mb-8">

//                             <Plus size={20} className="text-orange-500" />

//                             <h2 className="text-[10px] font-black text-white uppercase tracking-widest">Create Contest</h2>

//                         </div>



//                         <form onSubmit={createContestHandler} className="space-y-5">

//                             <LeetInput 

//                                 label="Contest Title" 

//                                 placeholder="E.G. WEEKEND BASH"

//                                 value={contestTitle}

//                                 onChange={(e) => setContestTitle(e.target.value)}

//                                 required 

//                             />

                            

//                             <div className="grid grid-cols-2 gap-4">

//                                 <LeetSelect label="Collection" options={collectionOptions} value={contestCollectionId} onChange={(e) => setContestCollectionId(e.target.value)} required />

//                                 <LeetSelect label="Visibility" options={VISIBILITY_OPTIONS} value={contestVisibility} onChange={(e) => setContestVisiblity(e.target.value)} />

//                             </div>



//                             {selectedCollection?.questionsCount === 0 && (

//                                 <div className="flex items-center gap-2 p-3 bg-rose-950/20 border border-rose-900/50 text-rose-500 text-[9px] font-bold uppercase">

//                                     <AlertCircle size={14} />

//                                     <span>Empty collection detected.</span>

//                                 </div>

//                             )}



//                             <div className="grid grid-cols-2 gap-4">

//                                 <LeetInput 

//                                     label="Questions" type="number" 

//                                     max={selectedCollection ? selectedCollection.questionsCount : 5}

//                                     value={contestQuestionCount}

//                                     onChange={(e) => setContestQuestionCount(e.target.value)}

//                                     disabled={selectedCollection?.questionsCount === 0}

//                                 />

//                                 <LeetSelect label="Duration" options={DURATION_OPTIONS} value={contestDuration} onChange={(e) => setContestDuration(e.target.value)} />

//                             </div>



//                             <LeetButton 

//                                 type="submit" 

//                                 text="Launch Contest" 

//                                 icon={Swords} 

//                                 className="w-full justify-center py-4"

//                                 disabled={selectedCollection?.questionsCount === 0}

//                             />

//                         </form>

//                     </section>

//                 </div>



//                 {/* 3. DASHBOARD NAVIGATION (LEETLAB ROW STYLE) */}

//                 <section className="space-y-4">

//                     <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">

//                         <LayoutList size={14} /> Your Dashboard

//                     </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-zinc-800 border border-zinc-800">

//                         {[

//                             { name: "All History", sub: "View past performance", path: "/contests/all" },

//                             { name: "Created", sub: "Manage your lobbies", path: "/contests/created" },

//                             { name: "Joined", sub: "Track participated events", path: "/contests/joined" }

//                         ].map((nav) => (

//                             <div key={nav.name} onClick={() => navigate(nav.path)} className="bg-black p-6 hover:bg-zinc-900 transition-all cursor-pointer group">

//                                 <div className="flex justify-between items-center">

//                                     <div>

//                                         <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{nav.name}</h4>

//                                         <p className="text-[9px] text-zinc-600 font-bold uppercase mt-1 italic">{nav.sub}</p>

//                                     </div>

//                                     <ArrowRight size={16} className="text-zinc-800 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />

//                                 </div>

//                             </div>

//                         ))}

//                     </div>

//                 </section>



//                 {/* 4. LIVE LIST (LEETLAB TABLE STYLE) */}

//                 <section className="space-y-4">

//                     <div className="flex items-center gap-2">

//                         <span className="relative flex h-2 w-2">

//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>

//                             <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>

//                         </span>

//                         <h2 className="text-[10px] font-black text-white uppercase tracking-widest">Live & Upcoming</h2>

//                     </div>



//                     <div className="bg-[#18181B] border border-zinc-700 overflow-hidden rounded-none">

//                         {activeContests.length > 0 ? (

//                             <div className="divide-y divide-zinc-800">

//                                 {activeContests.map((c) => (

//                                     <ContestRow key={c._id} contest={c} onNavigate={navigateToContest} />

//                                 ))}

//                             </div>

//                         ) : (

//                             <div className="flex flex-col items-center justify-center py-16 text-zinc-700 space-y-4">

//                                 <Trophy size={32} strokeWidth={1.5} className="opacity-20" />

//                                 <p className="text-[10px] font-black uppercase tracking-tighter">No active contests found.</p>

//                             </div>

//                         )}

//                     </div>

//                 </section>



//             </main>

//         </div>

//     );

// }








                       
                       