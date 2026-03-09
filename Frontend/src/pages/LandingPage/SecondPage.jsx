

// import React from 'react';


// import { motion } from 'framer-motion';

// const SecondPage = () => {
//   return (
//     <section className="relative w-full h-screen bg-black overflow-hidden flex items-center">
      
//       {/* --- BACKGROUND VIDEO --- */}
//       <div className="absolute inset-0 z-0 w-full h-full">
//         <video 
//           src="/vid1.mp4" 
//           autoPlay loop muted playsInline
//           className="w-full h-full object-cover opacity-30 grayscale-[40%]" 
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
//         {/* LEFT SIDE: Text */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, amount: 0.3 }} // Jab 30% page dikhega tabhi trigger hoga aur fix ho jayega
//         >
//           <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white font-sans">
//             <span className="bg-gradient-to-r from-white via-white to-orange-500 bg-clip-text text-transparent">
//               TalkTown
//             </span>
//           </h2>

//           <p className="text-lg md:text-xl text-zinc-400 max-w-sm mb-8 leading-relaxed font-sans">
//             <span className="text-white font-medium">DSA is better with friends.</span> Join lobbies, chat in real-time, and master logic together. <span className="text-orange-500/80 italic font-medium">Stop solving alone.</span>
//           </p>
          
//           <button className="px-10 py-4 border border-orange-500/50 text-orange-500 rounded-full hover:bg-orange-500 hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-xs">
//             Enter Lobby
//           </button>
//         </motion.div>

//         {/* RIGHT SIDE: Perfectly Fixed Card */}
//         <div className="flex justify-center items-center relative perspective-1000">
          
//           {/* Static Background Glow */}
//           <div className="absolute w-[350px] h-[350px] bg-orange-600/10 blur-[100px] rounded-full"></div>

//           <motion.div 
//             // ENTRANCE: Ye sirf ek baar chalega
//             initial={{ opacity: 0, scale: 0.8, x: 100 }}
//             whileInView={{ opacity: 1, scale: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.5 }} // Ek baar 50% card dikha, toh animation "Final" state mein lock ho jayegi
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="relative z-10"
//           >
//             {/* LOOP: Settle hone ke baad ye hamesha chalta rahega, bina reset huye */}
//             <motion.div
//               animate={{ 
//                 y: [0, -12, 0],
//               }}
//               transition={{ 
//                 duration: 4, 
//                 repeat: Infinity, 
//                 ease: "easeInOut",
//               }}
//             >
//               {/* The Card Container with Orange Border */}
//               <div className="relative w-[300px] h-[440px] md:w-[320px] md:h-[450px] rounded-[3rem] overflow-hidden border-2 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)] bg-zinc-900">
                
//                 <video 
//                   src="/vid1.mp4" 
//                   autoPlay loop muted playsInline
//                   className="w-full h-full object-cover opacity-90"
//                 />

//                 {/* Overlays */}
//                 <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"></div>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-white/5 opacity-30"></div>
                
//                 {/* Glow Border Internal */}
//                 <div className="absolute inset-0 rounded-[3rem] border border-orange-500/20"></div>
//               </div>

//               {/* Shadow effect */}
//               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/5 h-5 bg-orange-950/40 blur-xl rounded-full"></div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SecondPage;



// import React from 'react';
// import { motion } from 'framer-motion';

// const SecondPage = () => {
//   return (
//     <section className="relative w-full h-screen bg-black overflow-hidden flex items-center">
      
//       {/* --- BACKGROUND VIDEO (Fixed Visibility) --- */}
//       <div className="absolute inset-0 z-0 w-full h-full">
//         <video 
//           src="/vid1.mp4" 
//           autoPlay loop muted playsInline
//           // Opacity ko 30% se 60% kiya aur grayscale hataya taaki video clear dikhe
//           className="w-full h-full object-cover opacity-60 transition-opacity duration-1000" 
//         />
        
//         {/* Gradients ko "via-black/60" se "via-black/20" kiya taaki center se video saaf dikhe */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent opacity-80"></div>
        
//         {/* Niche aur upar ka gradient thoda light kiya */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
//         {/* LEFT SIDE: Text */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white font-sans">
//             <span className="bg-gradient-to-r from-white via-white to-orange-500 bg-clip-text text-transparent">
//               TalkTown
//             </span>
//           </h2>

//           <p className="text-lg md:text-xl text-zinc-300 max-w-sm mb-8 leading-relaxed font-sans">
//             <span className="text-white font-medium">DSA is better with friends.</span> Join lobbies, chat in real-time, and master logic together. <span className="text-orange-500 italic font-bold">Stop solving alone.</span>
//           </p>
          
//           <button className="px-10 py-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(249,115,22,0.3)]">
//             Enter Lobby
//           </button>
//         </motion.div>

//         {/* RIGHT SIDE: Card */}
//         <div className="flex justify-center items-center relative perspective-1000">
//           <div className="absolute w-[350px] h-[350px] bg-orange-600/20 blur-[100px] rounded-full"></div>

//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8, x: 100 }}
//             whileInView={{ opacity: 1, scale: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.5 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="relative z-10"
//           >
//             <motion.div
//               animate={{ y: [0, -12, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <div className="relative w-[300px] h-[440px] md:w-[320px] md:h-[450px] rounded-[3rem] overflow-hidden border-2 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.4)] bg-zinc-900">
//                 <video 
//                   src="/vid1.mp4" 
//                   autoPlay loop muted playsInline
//                   className="w-full h-full object-cover opacity-100"
//                 />
//                 <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]"></div>
//               </div>
//               <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/5 h-5 bg-orange-950/60 blur-xl rounded-full"></div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SecondPage;



import React from 'react';
import { motion } from 'framer-motion';

const SecondPage = () => {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center">
      
      {/* --- BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video 
          src="/vid1.mp4" 
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* LEFT SIDE: Text (Slow & Smooth Reveal) */}
        <motion.div 
          initial={{ opacity: 0, x: 500 }} // Card ke kaafi peeche se start
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ 
            duration: 2.2,     // Speed kaafi slow kar di (2.2 seconds)
            delay: 0.8,        // Card ke settle hone ka thoda aur intezaar (0.8s)
            ease: [0.19, 1, 0.22, 1] // "Quintic" easing: Shuruat mein smooth, beech mein glide, ant mein ekdum thahraav
          }}
          className="z-0 order-2 md:order-1"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white font-sans">
            <span className="bg-gradient-to-r from-white via-white to-orange-500 bg-clip-text text-transparent">
              TalkTown
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-300 max-w-sm mb-8 leading-relaxed font-sans">
            <span className="text-white font-medium">DSA is better with friends.</span> Join lobbies, chat in real-time, and master logic together. <span className="text-orange-500 italic font-bold">Stop solving alone.</span>
          </p>
          
          <button className="px-10 py-4 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-black transition-all duration-700 font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            Enter Lobby
          </button>
        </motion.div>

        {/* RIGHT SIDE: Card (Static/Anchor point) */}
        <div className="flex justify-center items-center relative perspective-1000 z-10 order-1 md:order-2">
          
          <div className="absolute w-[350px] h-[350px] bg-orange-600/20 blur-[100px] rounded-full"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeOut" }} // Card bhi thoda slow aayega
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative w-[300px] h-[440px] md:w-[320px] md:h-[450px] rounded-[3rem] overflow-hidden border-2 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.6)] bg-zinc-900">
                <video 
                  src="/vid1.mp4" 
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]"></div>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/5 h-5 bg-orange-950/60 blur-xl rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecondPage;




