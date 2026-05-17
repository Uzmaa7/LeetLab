




import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Plus, Users, Clock, ArrowRight } from 'lucide-react';

const FourthPage = () => {
  const upcomingContests = [
    { title: "Weekly Sprint #42", date: "Feb 24, 08:00 PM", participants: "1.2k" },
    { title: "Data Structure Duel", date: "Feb 26, 09:30 PM", participants: "850" },
  ];


  const themeOrange = "#ea580c";

  return (
    <section className="relative w-full py-24 px-6 md:px-16 bg-black flex items-center justify-center overflow-hidden font-sans">

      {/* Background subtle glow to match Hero embers */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-orange-600/5 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

        {/* LEFT: LIVE & UPCOMING */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="text-orange-600" size={24} />
            <h2 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white via-white/90 to-orange-600 bg-clip-text text-transparent">
              Contest Arena
            </h2>
          </div>

          {/* --- LIVE CONTEST CARD --- */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 md:p-10 overflow-hidden group shadow-2xl mb-8"
          >
            {/* Live Indicator */}
            <div className="absolute top-6 right-8">
              <span className="flex items-center gap-2 text-red-500 border border-orange-600/30 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping" /> LIVE
              </span>
            </div>

            <div className="space-y-6">
              <h3 className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase font-bold">Global Challenge</h3>
              <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">The Binary Titan v2.0</h4>

              <div className="flex items-center gap-8 py-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users size={16} className="text-[#60a5fa]" />
                  <span className="text-xs font-mono text-zinc-300">4,829 Joined</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock size={16} className="text-[#60a5fa]" />
                  <span className="text-xs font-mono text-zinc-300">45:12 Left</span>
                </div>
              </div>



              <button className="bg-[#0a0a0a] border border-zinc-800 text-white font-black px-12 py-4 rounded-md text-[10px] transition-all active:scale-95 uppercase tracking-[0.2em]  hover:border-zinc-600 hover:-translate-y-1">
                Enter Arena
              </button>
            </div>
          </motion.div>

          {/* --- UPCOMING LIST --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingContests.map((contest, i) => (
              <div key={i} className="bg-[#0d0d0d]/60 border border-white/5 p-5 rounded-xl flex items-center justify-between group hover:border-white/10 transition-all">
                <div className="space-y-1">
                  <h5 className="text-white font-bold text-[13px] tracking-tight">{contest.title}</h5>
                  <span className="text-zinc-500 font-mono text-[10px] block">{contest.date}</span>
                </div>
                <button className="text-[#60a5fa] text-[10px] font-bold ">
                  Remind
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: CREATE & STATS */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Host Card */}
          <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl">
            <div className="w-14 h-14 bg-orange-600/10 rounded-xl flex items-center justify-center border border-orange-600/20 mb-6">
              <Plus className="text-orange-600" size={28} />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">Host Your Own</h4>
            <p className="text-zinc-500 text-xs leading-relaxed mb-8 px-2">
              Create secure, private lobbies for your team trials.
            </p>
            <button className="w-full py-3.5 border border-white/10 hover:bg-white/5 text-zinc-300 hover:text-white rounded-md text-[10px] font-black uppercase tracking-[0.2em] transition-all">
              Initialize Lobby
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