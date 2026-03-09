


import React from 'react';
import Navbar from "./Navbar.jsx"
import ThirdPage from './ThirdPage.jsx';
import SecondPage from './SecondPage.jsx';
import { motion } from 'framer-motion';
import FourthPage from './FourthPage.jsx';
import SixthPage from './SixthPage.jsx';
import SeventhPage from './SeventhPage.jsx';


const LandingPage = () => {
    return (
        <div className="w-full bg-black">
            
            {/* --- SECTION 1: HERO/LANDING --- */}
            <div className="relative w-full h-screen overflow-hidden flex flex-col">
                <Navbar />

                {/* Video Background Layer */}
                <div className="absolute inset-0 z-0">
                    <video 
                        src="/vid2.mp4" 
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
                </div>

                {/* --- CENTERED CONTENT (Shifted Down with pt-24) --- */}
                <main className="relative z-10 flex-grow flex items-center justify-center px-4 pt-24"> 
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full max-w-4xl flex flex-col items-center text-center"
                    >
                        {/* Compact Badge */}
                        <motion.div 
                            className="inline-block px-4 py-1 mb-6 border border-white/10 bg-white/5 backdrop-blur-xl rounded-full"
                        >
                            <span className="text-orange-500 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
                                // System.Initialize(LeetLab)
                            </span>
                        </motion.div>

                        {/* Smaller, Sharp Heading with Gradient */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 tracking-tighter">
                            <span className="bg-gradient-to-r from-white via-white/80 to-orange-500 bg-clip-text text-transparent inline-block">
                                Make Logic Permanent.
                            </span>
                        </h1>

                        {/* Compact Sub-text */}
                        <p className="text-sm md:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed px-4">
                            From real-time lobbies to collaborative peer learning—we've built a system where you don't just solve problems, you <span className="text-white">discuss and retain</span> them with a community.
                        </p>

                        {/* Action Buttons Container */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-3.5 bg-orange-500 text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all text-sm uppercase tracking-wider"
                            >
                                Get Started Free
                            </motion.button>
                            
                            <motion.button 
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="w-full sm:w-auto px-8 py-3.5 border border-white/10 text-white font-bold rounded-full transition-all text-sm uppercase tracking-wider"
                            >
                                View Challenges
                            </motion.button>
                        </div>
                    </motion.div>
                </main>
            </div>


            {/* --- SECTION 2 --- */}
            <ThirdPage/>
            <SecondPage />
            <FourthPage/>
            <SixthPage/>
            {/* <SeventhPage/> */}
            
            
            
        </div>
    );
};
export default LandingPage;










