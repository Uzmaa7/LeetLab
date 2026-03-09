// import React from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, Calendar, Plus, Users, Clock } from 'lucide-react';

// const FourthPage = () => {
//   const upcomingContests = [
//     { title: "Weekly Sprint #42", date: "Feb 24, 08:00 PM", participants: "1.2k" },
//     { title: "Data Structure Duel", date: "Feb 26, 09:30 PM", participants: "850" },
//     { title: "Algorithm Masters", date: "Mar 01, 10:00 AM", participants: "2.5k" },
//   ];

//   return (
//     <section className="relative w-full min-h-screen bg-black py-24 px-10 flex flex-col items-center justify-center">
//       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        
//         {/* LEFT: LIVE & UPCOMING (8 Columns) */}
//         <div className="lg:col-span-8 space-y-8">
//           <div className="flex items-center gap-3 mb-4">
//             <Trophy className="text-[#d85c8a]" size={28} />
//             <h2 className="text-3xl font-bold text-white tracking-tighter">Contest Arena</h2>
//           </div>

//           {/* --- LIVE CONTEST CARD --- */}
//           <motion.div 
//             whileHover={{ y: -5 }}
//             className="relative bg-[#111827] border border-[#d85c8a]/30 rounded-3xl p-8 overflow-hidden group shadow-[0_0_30px_rgba(216,92,138,0.1)]"
//           >
//             <div className="absolute top-0 right-0 p-6">
//                <span className="flex items-center gap-2 bg-[#d85c8a] text-black text-[10px] font-black px-3 py-1 rounded-full animate-pulse">
//                  <span className="w-1.5 h-1.5 bg-black rounded-full" /> LIVE NOW
//                </span>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-[#60a5fa] font-mono text-sm tracking-widest uppercase">Global Challenge</h3>
//               <h4 className="text-4xl font-black text-white tracking-tight">The Binary Titan v2.0</h4>
//               <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
//                 Compete with top developers worldwide. Solve 4 complex problems in 90 minutes. 
//               </p>
              
//               <div className="flex items-center gap-6 py-4">
//                 <div className="flex items-center gap-2 text-zinc-300">
//                   <Users size={16} className="text-[#fbbf24]" />
//                   <span className="text-xs font-mono">4,829 Joined</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-zinc-300">
//                   <Clock size={16} className="text-[#fbbf24]" />
//                   <span className="text-xs font-mono">45:12 Left</span>
//                 </div>
//               </div>

//               <button className="bg-[#d85c8a] hover:bg-[#c24b75] text-black font-black px-10 py-4 rounded-xl text-sm transition-all transform active:scale-95 uppercase tracking-widest">
//                 Enter Arena
//               </button>
//             </div>
//           </motion.div>

//           {/* --- UPCOMING LIST --- */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {upcomingContests.map((contest, i) => (
//               <div key={i} className="bg-[#0b0e14] border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:border-white/10 transition-colors">
//                 <div className="space-y-1">
//                   <h5 className="text-white font-bold text-sm">{contest.title}</h5>
//                   <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-mono">
//                     <span className="flex items-center gap-1"><Calendar size={12}/> {contest.date}</span>
//                     <span className="flex items-center gap-1"><Users size={12}/> {contest.participants}</span>
//                   </div>
//                 </div>
//                 <button className="text-[#60a5fa] border border-[#60a5fa]/20 px-4 py-1.5 rounded-lg text-[10px] font-bold hover:bg-[#60a5fa] hover:text-black transition-all">
//                   Remind
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: CREATE & STATS (4 Columns) */}
//         <div className="lg:col-span-4 space-y-6">
//           {/* CREATE CONTEST BOX */}
//           <div className="bg-[#111827] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center space-y-6">
//             <div className="w-16 h-16 bg-[#fbbf24]/10 rounded-2xl flex items-center justify-center border border-[#fbbf24]/20">
//               <Plus className="text-[#fbbf24]" size={32} />
//             </div>
//             <div>
//               <h4 className="text-white font-black text-xl mb-2 tracking-tight">Host Your Own</h4>
//               <p className="text-zinc-500 text-xs leading-relaxed">
//                 Create a private lobby for your college or friends. Customize problems & timing.
//               </p>
//             </div>
//             <button className="w-full py-4 border border-white/10 hover:bg-white/5 text-white rounded-xl text-xs font-bold uppercase tracking-[2px] transition-all">
//               Create New Contest
//             </button>
//           </div>

//           {/* MINI LEADERBOARD PREVIEW */}
//           <div className="bg-[#0b0e14] border border-white/5 rounded-3xl p-6">
//             <h5 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-4">Top Performers</h5>
//             {[1, 2, 3].map((pos) => (
//               <div key={pos} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
//                 <div className="flex items-center gap-3">
//                   <span className="text-[#fbbf24] font-mono text-xs">0{pos}</span>
//                   <div className="w-7 h-7 bg-zinc-800 rounded-full" />
//                   <span className="text-white text-xs font-medium">User_{pos}42</span>
//                 </div>
//                 <span className="text-[#4ade80] font-mono text-[10px]">2940 pts</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FourthPage;





import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Plus, Users, Clock } from 'lucide-react';

const FourthPage = () => {
  const upcomingContests = [
    { title: "Weekly Sprint #42", date: "Feb 24, 08:00 PM", participants: "1.2k" },
    { title: "Data Structure Duel", date: "Feb 26, 09:30 PM", participants: "850" },
  ];

  return (
    <section className="relative w-full py-20 px-6 md:px-16 bg-black flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: LIVE & UPCOMING */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-[#d85c8a]" size={24} />
            <h2 className="text-2xl font-bold text-white tracking-tighter">Contest Arena</h2>
          </div>

          {/* --- LIVE CONTEST CARD --- */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-[#111827] border border-[#d85c8a]/20 rounded-2xl p-6 md:p-8 overflow-hidden group shadow-lg mb-6"
          >
            <div className="absolute top-4 right-4">
               <span className="flex items-center gap-2 bg-[#d85c8a]/10 border border-[#d85c8a]/30 text-[#d85c8a] text-[9px] font-bold px-3 py-1 rounded-full">
                 <span className="w-1.5 h-1.5 bg-[#d85c8a] rounded-full animate-ping" /> LIVE
               </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#60a5fa] font-mono text-[10px] tracking-[0.2em] uppercase">Global Challenge</h3>
              <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">The Binary Titan v2.0</h4>
              
              <div className="flex items-center gap-5 py-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users size={14} className="text-[#fbbf24]" />
                  <span className="text-[11px] font-mono">4,829 Joined</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock size={14} className="text-[#fbbf24]" />
                  <span className="text-[11px] font-mono">45:12 Left</span>
                </div>
              </div>

              <button className="bg-[#d85c8a] hover:bg-[#c24b75] text-black font-bold px-8 py-3 rounded-lg text-xs transition-all active:scale-95 uppercase tracking-wider">
                Enter Arena
              </button>
            </div>
          </motion.div>

          {/* --- UPCOMING LIST --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingContests.map((contest, i) => (
              <div key={i} className="bg-[#0b0e14] border border-white/5 p-4 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <h5 className="text-white font-bold text-xs">{contest.title}</h5>
                  <span className="text-zinc-500 text-[10px] block">{contest.date}</span>
                </div>
                <button className="text-[#60a5fa] text-[10px] font-bold hover:underline">
                  Remind
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: CREATE & STATS */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#fbbf24]/10 rounded-xl flex items-center justify-center border border-[#fbbf24]/20 mb-4">
              <Plus className="text-[#fbbf24]" size={24} />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Host Your Own</h4>
            <p className="text-zinc-500 text-[11px] mb-5">
              Create a private lobby for your college or friends.
            </p>
            <button className="w-full py-3 border border-white/10 hover:bg-white/5 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
              Create Contest
            </button>
          </div>

          <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5">
            <h5 className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase mb-4">Top Performers</h5>
            {[1, 2, 3].map((pos) => (
              <div key={pos} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-[#fbbf24] font-mono text-[10px]">#0{pos}</span>
                  <span className="text-white text-[11px]">User_{pos}42</span>
                </div>
                <span className="text-[#4ade80] font-mono text-[9px]">2940 pts</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FourthPage;