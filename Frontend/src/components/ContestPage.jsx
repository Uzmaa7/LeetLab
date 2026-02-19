// import React from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, Zap, Globe, ChevronRight } from 'lucide-react';

// const ContestPage = () => {
//   return (
//     <section className="relative min-h-screen bg-black flex items-center justify-center py-20 overflow-hidden">
      
//       {/* --- BACKGROUND ELEMENTS --- */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full" />
//         {/* Subtle Grid Pattern */}
//         <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
//           {/* LEFT: TEXT & INFO (5 Columns) */}
//           <div className="lg:col-span-5 order-2 lg:order-1">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
//                 <Zap size={14} className="text-orange-500 fill-orange-500" />
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Live Competition</span>
//               </div>
              
//               <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
//                 THE <br />
//                 <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
//                   ARENA
//                 </span>
//               </h2>
              
//               <p className="text-zinc-400 text-lg mb-10 max-w-sm leading-relaxed">
//                 Step into the high-stakes world of competitive logic. No more boring problems—just pure, high-octane battles.
//               </p>

//               <div className="space-y-4 mb-10">
//                 {[
//                   { icon: <Trophy size={20}/>, text: "Weekly $2,000 Prize Pool" },
//                   { icon: <Globe size={20}/>, text: "Global Leaderboard Rank" }
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-4 text-white/80 font-medium">
//                     <span className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-orange-500">{item.icon}</span>
//                     {item.text}
//                   </div>
//                 ))}
//               </div>

//               <motion.button 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-orange-500 transition-colors"
//               >
//                 Enter Battleground
//                 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
//               </motion.button>
//             </motion.div>
//           </div>

//           {/* RIGHT: THE 3D VISUAL CARD (7 Columns) */}
//           <div className="lg:col-span-7 order-1 lg:order-2 relative flex justify-center">
            
//             {/* Main Interactive Card */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
//               whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               className="relative w-full max-w-[500px] aspect-[4/5] perspective-1000"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-[4rem] blur-3xl opacity-30" />
              
//               {/* Glass Card */}
//               <div className="relative h-full w-full bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden p-8 flex flex-col justify-between shadow-2xl">
                
//                 {/* Card Header */}
//                 <div className="flex justify-between items-start">
//                   <div className="h-12 w-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)]">
//                     <Trophy className="text-black font-bold" />
//                   </div>
//                   <div className="text-right">
//                     <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Next Major</p>
//                     <p className="text-white font-mono font-bold">24:00:00</p>
//                   </div>
//                 </div>

//                 {/* Card Center - Video or Abstract Shape */}
//                 <div className="relative flex-grow flex items-center justify-center my-8">
//                   <div className="absolute w-48 h-48 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
//                   {/* Yahan aap koi small video bhi daal sakte hain */}
//                   <div className="z-10 text-center">
//                     <p className="text-zinc-400 text-xs uppercase tracking-[0.3em] mb-2">Current Pool</p>
//                     <h3 className="text-6xl font-black text-white italic">$5,000</h3>
//                   </div>
//                 </div>

//                 {/* Card Footer */}
//                 <div className="space-y-4">
//                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//                    <div className="flex justify-between items-center text-xs">
//                       <span className="text-zinc-400 uppercase tracking-widest font-bold">Participants</span>
//                       <div className="flex -space-x-3">
//                         {[1,2,3,4].map(i => (
//                           <div key={i} className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
//                             <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
//                           </div>
//                         ))}
//                         <div className="h-8 w-8 rounded-full border-2 border-zinc-900 bg-orange-500 flex items-center justify-center text-[10px] font-bold text-black">+2k</div>
//                       </div>
//                    </div>
//                 </div>
//               </div>

//               {/* Decorative Floating Tags */}
//               <motion.div 
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//                 className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl hidden md:block"
//               >
//                 <p className="text-orange-500 text-xs font-black italic">ARENA_LIVE</p>
//               </motion.div>
//             </motion.div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContestPage;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, ArrowUpRight } from 'lucide-react';

// const ContestPage = () => {
//   return (
//     <section className="relative min-h-screen bg-black flex items-center justify-center py-10 overflow-hidden">
      
//       {/* Background Decor */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

//       <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
//         {/* Left: Minimal Text */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
//             THE <span className="text-orange-500">ARENA.</span>
//           </h2>
//           <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xs mb-8">
//             Compete globally. <br /> Master logic. Win big.
//           </p>
          
//           <button className="flex items-center gap-2 text-white font-bold tracking-widest text-xs border-b-2 border-orange-500 pb-1 hover:text-orange-500 transition-colors uppercase">
//             View Live Battles <ArrowUpRight size={16} />
//           </button>
//         </motion.div>

//         {/* Right: The Minimal Glass Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="relative group justify-self-center lg:justify-self-end"
//         >
//           {/* Card Shape */}
//           <div className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
            
//             <div className="flex justify-between items-center">
//               <div className="px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-[10px] text-orange-500 font-bold tracking-tighter">
//                 S12 • ACTIVE
//               </div>
//               <Trophy size={20} className="text-zinc-600" />
//             </div>

//             <div className="space-y-1">
//               <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Prize Pool</p>
//               <h3 className="text-5xl font-black text-white">$2,500</h3>
//             </div>

//             <div className="space-y-4">
//               <div className="flex -space-x-2">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="h-8 w-8 rounded-full border-2 border-black bg-zinc-800" />
//                 ))}
//                 <div className="h-8 w-8 rounded-full border-2 border-black bg-orange-500 flex items-center justify-center text-[10px] font-bold text-black">
//                   +1k
//                 </div>
//               </div>
//               <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-orange-500 transition-colors">
//                 Join Contest
//               </button>
//             </div>

//             {/* Subtle Inner Glow */}
//             <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />
//           </div>
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default ContestPage;


// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Phone, X, Check, Trophy, Users } from 'lucide-react';

// const ContestPage = () => {
//   return (
//     <section className="relative min-h-screen bg-black flex items-center justify-center py-20 overflow-hidden font-sans">
      
//       {/* Background Decorative Glows */}
//       <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full animate-pulse" />
//       </div>

//       <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center">
        
//         {/* Minimal Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-zinc-500 text-xs font-black uppercase tracking-[0.4em] mb-2">Live Notification</h2>
//           <div className="h-[1px] w-12 bg-orange-500 mx-auto" />
//         </motion.div>

//         {/* --- THE CALL CARD --- */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 30 }}
//           whileInView={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="relative w-full max-w-[400px] bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 shadow-2xl overflow-hidden"
//         >
//           {/* Subtle Video/Glow Background inside card */}
//           <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

//           {/* Caller Info */}
//           <div className="flex flex-col items-center text-center relative z-10">
//             <motion.div 
//               animate={{ scale: [1, 1.05, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(249,115,22,0.3)] border-4 border-black"
//             >
//               <Trophy size={40} className="text-black" />
//             </motion.div>
            
//             <h3 className="text-2xl font-black text-white tracking-tight mb-1">Global Arena S12</h3>
//             <p className="text-orange-500 font-mono text-xs font-bold tracking-widest uppercase mb-4">Incoming Challenge...</p>
            
//             <div className="flex items-center gap-4 py-3 px-6 bg-white/5 rounded-2xl border border-white/5 mb-10">
//               <div className="flex items-center gap-2">
//                 <Users size={14} className="text-zinc-500" />
//                 <span className="text-zinc-300 text-[10px] font-bold">2.4k Joining</span>
//               </div>
//               <div className="h-3 w-[1px] bg-zinc-700" />
//               <span className="text-orange-500 text-[10px] font-bold font-mono">$500 Pool</span>
//             </div>
//           </div>

//           {/* --- CALL ACTIONS --- */}
//           <div className="flex justify-between items-center px-4 relative z-10">
//             {/* Decline Button */}
//             <div className="flex flex-col items-center gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
//               >
//                 <X size={28} strokeWidth={3} />
//               </motion.button>
//               <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Decline</span>
//             </div>

//             {/* Accept Button */}
//             <div className="flex flex-col items-center gap-3">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="w-16 h-16 rounded-full bg-orange-500 border border-orange-400 flex items-center justify-center text-black shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all duration-300"
//               >
//                 <Check size={28} strokeWidth={3} />
//               </motion.button>
//               <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Accept</span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Footer Hint */}
//         <motion.p 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="mt-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]"
//         >
//           // Ready for the battle?
//         </motion.p>
//       </div>
//     </section>
//   );
// };

// export default ContestPage;




// import React from 'react';
// import { motion } from 'framer-motion';
// import { Phone, X, Check, Trophy, Activity } from 'lucide-react';

// const ContestPage = () => {
//   return (
//     <section className="relative min-h-screen bg-black flex items-center justify-center py-10 overflow-hidden font-sans">
      
//       {/* --- AMBIENT BACKGROUND GLOW --- */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
//       </div>

//       <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
        
//         {/* --- MINIMALIST CALL CARD --- */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           className="relative w-full bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center"
//         >
          
//           {/* Animated Ripples (Call Wave Effect) */}
//           <div className="absolute top-20 flex items-center justify-center">
//             {[1, 2, 3].map((i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0.5, scale: 1 }}
//                 animate={{ opacity: 0, scale: 2 }}
//                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
//                 className="absolute w-32 h-32 border border-emerald-500/20 rounded-full"
//               />
//             ))}
//           </div>

//           {/* Icon / Caller ID */}
//           <div className="relative z-10 flex flex-col items-center mb-16">
//             <div className="w-24 h-24 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
//               <Trophy size={40} className="text-emerald-500 shadow-emerald-500/50" />
//             </div>
            
//             <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic">
//               LIVE CONTEST
//             </h2>
//             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
//               <Activity size={12} className="text-emerald-500" />
//               <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Entry: Open</span>
//             </div>
//           </div>

//           {/* Info Stats (Minimal) */}
//           <div className="grid grid-cols-2 gap-8 w-full mb-16 px-4">
//             <div className="text-center">
//               <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1 text-nowrap">Prize Money</p>
//               <p className="text-white font-mono font-bold">$1.2k</p>
//             </div>
//             <div className="text-center">
//               <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Squad Size</p>
//               <p className="text-white font-mono font-bold">500+</p>
//             </div>
//           </div>

//           {/* --- ACTION BUTTONS (The Call Design) --- */}
//           <div className="flex justify-between items-center w-full px-4 relative z-20">
            
//             {/* Decline (Red) */}
//             <div className="flex flex-col items-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
//                 whileTap={{ scale: 0.9 }}
//                 className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 transition-colors group"
//               >
//                 <X size={32} strokeWidth={2.5} className="group-hover:text-white transition-colors" />
//               </motion.button>
//               <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Reject</span>
//             </div>

//             {/* Accept (Green) */}
//             <div className="flex flex-col items-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.1, backgroundColor: "#10b981", boxShadow: "0 0 40px rgba(16,185,129,0.4)" }}
//                 whileTap={{ scale: 0.9 }}
//                 className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
//               >
//                 <Check size={32} strokeWidth={3} />
//               </motion.button>
//               <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Accept</span>
//             </div>

//           </div>

//         </motion.div>

//         {/* --- BOTTOM DECOR --- */}
//         <div className="mt-12 opacity-20">
//            <p className="text-white text-[10px] font-mono tracking-[0.5em]">// INCOMING_TRANSMISSION</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContestPage;



// import React from 'react';
// import { motion } from 'framer-motion';
// import { X, Check, Trophy, Activity, Terminal } from 'lucide-react';

// const ContestPage = () => {
//   // Mock data for "Competing Users"
//   const users = [
//     "https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2",
//     "https://i.pravatar.cc/150?u=3", "https://i.pravatar.cc/150?u=4",
//     "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6"
//   ];

//   return (
//     <section className="relative min-h-screen bg-black flex items-center justify-center py-20 overflow-hidden font-sans">
      
//       {/* --- BACKGROUND: COMPETING LOGS & CODE --- */}
//       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
//         {/* Scrolling Code Snippets */}
//         <div className="absolute top-0 left-10 text-[10px] font-mono text-orange-500/40 leading-relaxed">
//           {`function solve(dp, n) { \n  for(let i=0; i<n; i++) \n  return Math.max(...dp); \n}`}
//         </div>
//         <div className="absolute bottom-10 right-10 text-[10px] font-mono text-emerald-500/40 text-right">
//           {`Compiling logic... \n Test Cases: 12/12 Passed \n Rank: #42`}
//         </div>

//         {/* Floating User Avatars (Compete vibe) */}
//         {users.map((url, i) => (
//           <motion.img
//             key={i}
//             src={url}
//             animate={{ 
//               y: [0, -100, 0], 
//               opacity: [0, 0.5, 0],
//               x: Math.sin(i) * 50 
//             }}
//             transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
//             className="absolute rounded-full w-12 h-12 grayscale border border-white/10"
//             style={{ 
//               left: `${15 * i}%`, 
//               top: `${20 + (i * 10)}%`,
//               filter: 'blur(1px)'
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 w-full max-w-lg px-6">
        
//         {/* --- THE ARENA CALL CARD --- */}
//         <motion.div
//           initial={{ opacity: 0, y: 50, scale: 0.9 }}
//           whileInView={{ opacity: 1, y: 0, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="relative bg-zinc-950/60 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-10 md:p-14 shadow-2xl overflow-hidden"
//         >
//           {/* Top Visual: Live Participants Strip */}
//           <div className="flex justify-center -space-x-3 mb-10">
//             {users.slice(0, 5).map((url, i) => (
//               <motion.img 
//                 key={i} 
//                 src={url} 
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ repeat: Infinity, delay: i * 0.2 }}
//                 className="w-10 h-10 rounded-full border-2 border-black" 
//               />
//             ))}
//             <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[8px] font-bold text-white italic">
//               +740
//             </div>
//           </div>

//           {/* Caller ID Section */}
//           <div className="text-center mb-12">
//             <motion.div 
//               animate={{ rotate: [0, 5, -5, 0] }}
//               transition={{ repeat: Infinity, duration: 4 }}
//               className="inline-block p-4 rounded-3xl bg-zinc-900 border border-white/5 mb-6"
//             >
//               <Terminal className="text-orange-500" size={32} />
//             </motion.div>
            
//             <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic">
//               LIVE CONTEST
//             </h2>
//             <div className="flex items-center justify-center gap-2">
//               <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
//               <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">System.Broadcast(Live)</span>
//             </div>
//           </div>

//           {/* Prize & Details Capsule */}
//           <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-around mb-12">
//             <div className="text-center">
//               <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Winning Pool</p>
//               <p className="text-white font-mono font-black text-xl text-orange-500">$1,500</p>
//             </div>
//             <div className="h-10 w-[1px] bg-white/10" />
//             <div className="text-center">
//               <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Time Left</p>
//               <p className="text-white font-mono font-black text-xl">14:20</p>
//             </div>
//           </div>

//           {/* --- ACTION BUTTONS --- */}
//           <div className="flex justify-between items-center px-2">
            
//             {/* Reject */}
//             <div className="flex flex-col items-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: -10 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="w-20 h-20 rounded-full bg-zinc-900 border border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
//               >
//                 <X size={32} strokeWidth={3} />
//               </motion.button>
//               <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Pass</span>
//             </div>

//             {/* Accept */}
//             <div className="flex flex-col items-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: 10 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_40px_rgba(16,185,129,0.4)]"
//               >
//                 <Check size={32} strokeWidth={3} />
//               </motion.button>
//               <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Connect</span>
//             </div>

//           </div>
//         </motion.div>

//         {/* Subtle Bottom Caption */}
//         <p className="text-center mt-10 text-zinc-700 text-[10px] font-bold uppercase tracking-[0.4em]">
//           Ready to climb the leaderboard?
//         </p>
//       </div>
//     </section>
//   );
// };

// export default ContestPage;



// import React from 'react';
// import { motion } from 'framer-motion';
// import { X, Check, Trophy, Plus, Calendar, Zap, Terminal, Users } from 'lucide-react';

// const ContestCard = ({ title, subtitle, status, type, icon: Icon, color, delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50, scale: 0.9 }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
//       className="relative w-full max-w-[380px] bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-10 shadow-2xl flex flex-col items-center group overflow-hidden"
//     >
//       {/* Subtle Background Glow */}
//       <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-20`} style={{ backgroundColor: color }} />

//       {/* Header Info */}
//       <div className="text-center mb-8 relative z-10">
//         <div className={`w-20 h-20 rounded-3xl bg-zinc-800 border border-white/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500`}>
//           <Icon size={32} style={{ color: color }} />
//         </div>
//         <h3 className="text-2xl font-black text-white tracking-tighter mb-1 uppercase italic">{title}</h3>
//         <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: color }}>{status}</p>
//       </div>

//       {/* Middle Content (Minimal Stats) */}
//       <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 mb-10 flex justify-around items-center">
//         <div className="text-center">
//           <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{type === 'create' ? 'Template' : 'Prize Pool'}</p>
//           <p className="text-white font-mono font-bold text-sm">{subtitle}</p>
//         </div>
//         <div className="h-6 w-[1px] bg-white/10" />
//         <div className="text-center">
//           <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Squad</p>
//           <p className="text-white font-mono font-bold text-sm">{type === 'create' ? 'Private' : '200+'}</p>
//         </div>
//       </div>

//       {/* Action Buttons (Call Style) */}
//       <div className="flex justify-between items-center w-full px-2 relative z-10">
//         <div className="flex flex-col items-center gap-2">
//           <button className="w-14 h-14 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-500 hover:bg-red-500/20 hover:text-red-500 transition-all">
//             <X size={24} />
//           </button>
//           <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Ignore</span>
//         </div>

//         <div className="flex flex-col items-center gap-2">
//           <button 
//             className="w-14 h-14 rounded-full flex items-center justify-center text-black shadow-lg transition-all hover:scale-110"
//             style={{ backgroundColor: color }}
//           >
//             {type === 'create' ? <Plus size={24} strokeWidth={3} /> : <Check size={24} strokeWidth={3} />}
//           </button>
//           <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: color }}>
//             {type === 'create' ? 'Build' : 'Accept'}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const ContestPage = () => {
//   return (
//     <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-24 overflow-hidden">
      
//       {/* Background Ambience */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full" />
//       </div>

//       {/* Section Heading */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         className="text-center mb-20 relative z-10"
//       >
//         <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 italic">THE ARENA</h2>
//         <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.4em]">Incoming Battle Requests</p>
//       </motion.div>

//       {/* Cards Grid */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        
//         <ContestCard 
//           title="Live Contest"
//           subtitle="$2,500"
//           status="In Progress"
//           type="live"
//           icon={Zap}
//           color="#10b981" // Green
//           delay={0.1}
//         />

//         <ContestCard 
//           title="Upcoming"
//           subtitle="Trophy & Badge"
//           status="Starts: 2h 40m"
//           type="upcoming"
//           icon={Calendar}
//           color="#f97316" // Orange
//           delay={0.3}
//         />

//         <ContestCard 
//           title="Create Own"
//           subtitle="Custom Logic"
//           status="Solo or Squad"
//           type="create"
//           icon={Terminal}
//           color="#ffffff" // White
//           delay={0.5}
//         />

//       </div>

//       {/* Decorative Text */}
//       <div className="mt-20 opacity-10">
//         <p className="text-[10px] font-mono tracking-[1em] text-white italic">SELECT_YOUR_BATTLE_GROUND</p>
//       </div>
//     </section>
//   );
// };

// export default ContestPage;



import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Trophy, Plus, Calendar, Zap, Terminal } from 'lucide-react';

const ContestCard = ({ title, subtitle, status, type, icon: Icon, color, index }) => {
  // Har card ke liye alag se variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.2 // Stagger effect yahan se aayega
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative w-full max-w-[350px] bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-8 shadow-2xl flex flex-col items-center group overflow-hidden"
    >
      {/* Top Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20" style={{ backgroundColor: color }} />

      <div className="text-center mb-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center mb-4 mx-auto">
          <Icon size={28} style={{ color: color }} />
        </div>
        <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">{title}</h3>
        <p className="text-[9px] font-bold tracking-[0.2em]" style={{ color: color }}>{status}</p>
      </div>

      <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 mb-8 flex justify-around items-center">
        <div className="text-center">
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Pool</p>
          <p className="text-white font-mono font-bold text-xs">{subtitle}</p>
        </div>
        <div className="text-center">
          <p className="text-[8px] font-bold text-zinc-500 uppercase mb-1">Mode</p>
          <p className="text-white font-mono font-bold text-xs">SQUAD</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center w-full px-4 relative z-10">
        <button className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-red-500 transition-colors">
          <X size={20} />
        </button>
        <button 
          className="w-12 h-12 rounded-full flex items-center justify-center text-black shadow-lg transition-transform active:scale-90"
          style={{ backgroundColor: color }}
        >
          {type === 'create' ? <Plus size={20} strokeWidth={3} /> : <Check size={20} strokeWidth={3} />}
        </button>
      </div>
    </motion.div>
  );
};

const ContestPage = () => {
  return (
    <section className="relative min-h-screen bg-black flex flex-col items-center justify-center py-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-orange-500/5 to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 px-6"
      >
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic">THE ARENA</h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.5em] mt-2">Incoming Transmission</p>
      </motion.div>

      {/* Cards Grid with Container Animation */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // 20% dikhte hi animate karega
        className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center"
      >
        <ContestCard 
          index={0}
          title="Live Now"
          subtitle="$2,500"
          status="Battling"
          type="live"
          icon={Zap}
          color="#10b981"
        />

        <ContestCard 
          index={1}
          title="Upcoming"
          subtitle="Tokens"
          status="In 2 Hours"
          type="upcoming"
          icon={Calendar}
          color="#f97316"
        />

        <ContestCard 
          index={2}
          title="Create"
          subtitle="Private"
          status="New Lobby"
          type="create"
          icon={Terminal}
          color="#ffffff"
        />
      </motion.div>

    </section>
  );
};

export default ContestPage;