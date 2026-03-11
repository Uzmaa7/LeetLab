

import React from 'react';
import Navbar from "./Navbar.jsx"
import {ThirdPage} from "../index.jsx"
import {SecondPage} from "../index.jsx"
import { motion } from 'framer-motion';
import {FourthPage} from "../index.jsx"
import {SixthPage} from "../index.jsx"
// import SeventhPage from "../index.jsx"
import { LeetButton } from '../../components/index.jsx';
import { Rocket, Trophy } from 'lucide-react'; // Icons for buttons



const LandingPage = () => {
    return (
        <div className="w-full bg-black overflow-x-hidden">
            
            {/* --- SECTION 1: HERO/LANDING --- */}
            {/* Responsive Height: Mobile pe content ke hisaab se, desktop pe 100vh */}
            <div className="relative w-full min-h-screen md:h-screen overflow-hidden flex flex-col">
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

                {/* --- CENTERED CONTENT --- */}
               
                <main className="relative z-10 flex-grow flex items-center justify-center px-6 pt-0 mt-[-20px] md:mt-[-80px]">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full max-w-4xl flex flex-col items-center text-center"
                    >
                        

                        <div className="flex items-center gap-4 px-3 py-1 bg-[#10192A] border border-[#1E2E48] rounded-full">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[11px] font-bold text-emerald-300  tracking-wider">v1.0 is Live</span>
                             </div>

                        {/* Responsive Heading: 4xl mobile, 6xl+ desktop */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[1.1] mb-6 mt-6 tracking-tighter">
                            <span className="bg-gradient-to-r from-white via-white/80 to-orange-500 bg-clip-text text-transparent inline-block">
                                Make Logic Permanent
                            </span>
                        </h1>

                        {/* Responsive Sub-text: text-sm mobile, text-lg desktop */}
                        <p className="text-sm md:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
                            From real-time lobbies to collaborative peer learning—we've built a system where you don't just solve problems, you <span className="text-white">discuss and retain</span> them with a community.
                        </p>

                        {/* 2. Action Buttons Container (Theme Buttons Integrated) */}
                        {/* 1. Responsive: Mobile pe stack (flex-col), tablet+ pe horizontal (flex-row) */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                            <LeetButton 
                                text="Get Started Free" 
                                icon={Rocket} 
                                className="w-full sm:w-auto px-10 py-4"
                                onClick={() => {}} // Navigation logic intact in Navbar/Auth
                            />
                            
                            <LeetButton 
                                text="View Challenges" 
                                icon={Trophy} 
                                className="w-full sm:w-auto px-10 py-4 bg-zinc-900/50 border-zinc-800" 
                                onClick={() => {}}
                            />
                        </div>
                    </motion.div>
                </main>
            </div>

            {/* --- OTHER SECTIONS --- */}
            <ThirdPage/>
            <SecondPage />
            <FourthPage/>
            <SixthPage/>
            
        </div>
    );
};
export default LandingPage;
