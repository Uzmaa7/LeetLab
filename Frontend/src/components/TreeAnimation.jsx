import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { LeetButton } from '../components/index.jsx';

import {
    Search, Plus, ExternalLink, Trophy, LayoutGrid, Swords, BarChart3,
    X, Link as LinkIcon, Tag, ChevronDown, Microscope, Layers, Flame, ChevronUp,
    CheckCircle2, Edit3, Trash2, Square, CheckSquare, FolderPlus, Laptop, Sparkles, CloudMoon
} from 'lucide-react';




const TreeAnimation = ({ activeTab }) => {
    // 🍂 Realistic Autumn Falling Leaves
    const leafVariants = {
        initial: (i) => ({
            y: 10 + Math.random() * 20,
            opacity: 0,
            rotate: Math.random() * 360,
            x: 185 + (i * 10 - 25)
        }),
        animate: (i) => {
            const direction = i % 3 === 0 ? 1 : (i % 3 === 1 ? -1 : 0);
            const spread = 80 + Math.random() * 80;
            const speedVar = 10 + Math.random() * 5;

            return {
                y: [20, 100, 200, 280],
                opacity: [0, 1, 0.9, 0],
                rotate: [0, 360, 720, 1080],
                x: [
                    185,
                    185 + (spread * 0.5 * direction),
                    185 - (spread * 0.2 * direction),
                    185 + (spread * direction)
                ],
                transition: {
                    duration: speedVar,
                    repeat: Infinity,
                    delay: i * 2.2,
                    ease: [0.4, 0, 0.2, 1]
                }
            };
        }
    };

    const autumnColors = ["#e67e22", "#d35400", "#f39c12", "#c0392b", "#e74c3c"];

    return (

        <div className="relative w-full max-w-[240px] h-[260px] mb-[-60px] overflow-visible hidden md:block select-none drop-shadow-[0_0_20px_rgba(230,126,34,0.15)] mx-auto z-30">

            {/* Atmospheric Icons */}
            <motion.div
                animate={{ y: [0, -4, 0], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-8 text-blue-300/15"
            >
                <CloudMoon size={28} />
            </motion.div>


            <svg viewBox="0 0 450 300"
                className="w-full h-full scale-150 origin-bottom translate-y-4 overflow-visible">
                <defs>
                    <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3e2a18" />
                        <stop offset="60%" stopColor="#2c1a11" />
                        <stop offset="100%" stopColor="#1a100a" />
                    </linearGradient>

                    <radialGradient id="canopyGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#d35400" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#d35400" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="laptopGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* 1. Ground and Ground Leaves */}
                <ellipse cx="210" cy="275" rx="90" ry="12" fill="rgba(0,0,0,0.1)" />

                {[...Array(18)].map((_, i) => (
                    <ellipse
                        key={`ground-leaf-${i}`}
                        cx={140 + (i % 7) * 25 + Math.random() * 15}
                        cy={272 + (i % 3) * 3 + Math.random() * 5}
                        rx={3 + Math.random() * 2}
                        ry={1.5 + Math.random() * 1}
                        fill={autumnColors[i % autumnColors.length]}
                        opacity={0.6 - Math.random() * 0.3}
                        transform={`rotate(${Math.random() * 360} ${140 + (i % 7) * 25 + Math.random() * 15} ${272 + (i % 3) * 3 + Math.random() * 5})`}
                    />
                ))}

                {/* 2. Enhanced Realistic Tree Trunk */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <path d="M200,275 L225,275 Q215,190 195,130 L180,130 Q195,200 200,275 Z" fill="url(#trunkGrad)" />
                    <path d="M203,240 Q206,190 200,150" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none" />
                    <path d="M198,220 Q194,180 190,140" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" fill="none" />

                    <path d="M190,130 Q160,110 140,70 Q130,50 145,40" stroke="url(#trunkGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                    <path d="M190,130 Q220,110 240,80 Q250,60 235,50" stroke="url(#trunkGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    <path d="M190,130 Q195,110 210,90 Q215,80 205,70" stroke="url(#trunkGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />

                    <path d="M165,110 L145,100" stroke="#3e2a18" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M215,100 L230,90" stroke="#3e2a18" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </motion.g>


                {/* 3. Lush Autumn Canopy*/}
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 1.2 }} className="z-10">
                    {/* Base glow widely spread, made softer */}
                    <ellipse cx="190" cy="75" rx="130" ry="60" fill="url(#canopyGlow)" opacity="0.15" />

                    {/* Clusters*/}
                    {[...Array(25)].map((_, i) => (
                        <circle
                            key={`canopy-cluster-${i}`}
                            cx={90 + (i % 8) * 28 + Math.random() * 30} // Maximized X range
                            cy={25 + (i % 4) * 20 + Math.random() * 20}
                            r={16 + Math.random() * 10}
                            fill={autumnColors[i % autumnColors.length]}
                            opacity={0.1 + Math.random() * 0.15}
                        />
                    ))}

                    {/* Static Leaves: Density significantly reduced to 45 for airiness */}
                    {[...Array(45)].map((_, i) => {
                        // Spread across a very wide X (80 to 300)
                        const randomX = 100 + Math.random() * 220;
                        const randomY = 20 + Math.random() * 110;
                        return (
                            <ellipse
                                key={`static-leaf-${i}`}
                                fill={autumnColors[Math.floor(Math.random() * autumnColors.length)]}
                                opacity={0.35 + Math.random() * 0.25}
                                cx={randomX}
                                cy={randomY}
                                rx={6 + Math.random() * 3}
                                ry={3 + Math.random() * 2}
                                transform={`rotate(${Math.random() * 360} ${randomX} ${randomY})`}
                            />
                        );
                    })}
                </motion.g>

                {/* 4. Realistic Falling Autumn Leaves */}
                {[...Array(10)].map((_, i) => (
                    <motion.g key={i} custom={i} variants={leafVariants} initial="initial" animate="animate">
                        <ellipse
                            rx={3.5 + Math.random() * 2}
                            ry={1.5 + Math.random() * 1}
                            fill={autumnColors[i % autumnColors.length]}
                            opacity={0.9}
                        />
                    </motion.g>
                ))}

                {/* 5. Enhanced Figure Sitting */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
                    <path d="M215,275 L245,275 C250,275 250,260 235,255 L220,250 Z" fill="#1f293a" />
                    <path d="M208,275 L218,275 L230,230 C230,220 215,220 208,230 Z" fill="#314051" />
                    <circle cx="218" cy="220" r="8" fill="#2c3747" />
                    <path d="M220,214 Q226,214 226,220" stroke="#2c3747" strokeWidth="2.5" fill="none" />
                    <path d="M223,245 L238,248" stroke="#314051" strokeWidth="3.5" strokeLinecap="round" />

                    <motion.g animate={{ rotate: [0, -1.8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
                        <rect x="235" y="250" width="24" height="2.5" fill="#465467" rx="1" />
                        <path d="M238,250 L258,228 L261,230 L241,252 Z" fill="#627288" />
                        <circle cx="253" cy="238" r="10" fill="url(#laptopGlow)" />
                        <Laptop className="z-10" size={10} style={{ x: 236, y: 250 }} fill="none" stroke="#2c3747" strokeWidth={1} />
                    </motion.g>
                </motion.g>

                <motion.path
                    d="M130,275 L290,275"
                    stroke="#e67e22"
                    strokeWidth="0.5"
                    animate={{ opacity: [0.05, 0.25, 0.05] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </svg>
        </div>
    );
};

export default TreeAnimation