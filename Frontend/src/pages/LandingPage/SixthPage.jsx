





import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, Sparkles } from 'lucide-react';

const SixthPage = () => {
    const previewPost = {
        user: "Serena",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        image: "/feed_2.jpg", // Aapki image path
        content: "Today's achievement! 🏆 Secured 1st rank on the leaderboard. Hard work finally paying off. #coding #achievement",
        likes: "1,224",
        time: "2h"
    };

    return (
        <section className="relative w-full py-24 px-6 bg-black flex items-center justify-center overflow-hidden font-sans">
            
            {/* Background Glows to match Hero Section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-600/5 blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* LEFT SIDE: TEXT CONTENT */}
                <div className="lg:col-span-6 space-y-8">
                    <div className="space-y-4">
                        {/* <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-orange-500" />
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Coming Soon</span>
                        </div> */}
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                            The Social Media for <br />
                            <span className="bg-gradient-to-r from-white via-white/80 to-orange-600 bg-clip-text text-transparent">
                                Elite Developers.
                            </span>
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                            We are building the first social media for developers. Follow your friends, react to their contest victories, repost smart solutions, and build your coding legacy.
                        </p>
                    </div>

                    {/* Features List */}
                    {/* <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                            <h4 className="text-white font-bold text-sm">Post Victories</h4>
                            <p className="text-zinc-500 text-xs">Share your leaderboard ranks automatically.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white font-bold text-sm">Peer Review</h4>
                            <p className="text-zinc-500 text-xs">Discuss optimized solutions with experts.</p>
                        </div>
                    </div>

                    <div className="pt-6">
                        <span className="px-6 py-3 border border-zinc-800 bg-zinc-900/50 text-zinc-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Intelligence Feed v1.0
                        </span>
                    </div> */}


                    <div className="flex gap-4">
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    Coming Soon
                </span>
            </div>
                </div>

                {/* RIGHT SIDE: MOCK FEED PREVIEW */}
                <div className="lg:col-span-6 flex justify-center relative">
                    
                    {/* Decorative Elements */}
                    <div className="absolute -z-10 w-64 h-64 bg-orange-600/20 blur-3xl rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                    {/* The Post Card (Matching your internal Feed design) */}
                    <motion.div 
                        initial={{ opacity: 0, rotateY: -20, x: 50 }}
                        whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-[380px] flex flex-col border border-zinc-800/60 bg-[#0d0d0d] p-5 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <img src={previewPost.avatar} alt="User" className="w-9 h-9 rounded-full border border-orange-600/30" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-[14px] text-white leading-tight">{previewPost.user}</span>
                                    <span className="text-zinc-500 text-[11px]  tracking-tighter">{previewPost.time} ago</span>
                                </div>
                            </div>
                            <MoreHorizontal className="text-zinc-600" size={18} />
                        </div>

                        {/* Image Container (Simulating code/contest result post) */}
                        <div className="w-full aspect-square overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center relative group">
                            <img 
                                src={previewPost.image} 
                                alt="Post" 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            {/* Achievement Tag */}
                            <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-md shadow-lg shadow-orange-950/50">
                                #RANK_1
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-5 space-y-4">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-5">
                                    <Heart size={22} className="text-red-600 fill-orange-600/10 hover:fill-orange-600 transition-all cursor-pointer" />
                                    <MessageCircle size={22} className="text-zinc-400 hover:text-white transition-all cursor-pointer" />
                                    <Send size={22} className="text-zinc-400 hover:text-white transition-all cursor-pointer" />
                                </div>
                                <Bookmark size={22} className="text-zinc-400 hover:text-white transition-all cursor-pointer" />
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-[13px] font-black text-white">{previewPost.likes} <span className="text-zinc-500 font-medium">Likes</span></p>
                                <p className="text-[13px] leading-relaxed">
                                    {/* <span className="font-bold text-orange-500 mr-2">{previewPost.user}</span> */}
                                    <span className="text-zinc-300">{previewPost.content}</span>
                                </p>
                            </div>

                            {/* Comment Mockup */}
                            <div className="pt-2 border-t border-zinc-900">
                                <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest">Add a comment...</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Second Mock Card behind (Visual depth) */}
                    <div className="absolute -z-20 top-10 -right-4 w-full max-w-[380px] h-[500px] border border-zinc-800/30 bg-zinc-900/20 rounded-3xl opacity-50 blur-sm scale-95 md:block hidden"></div>
                </div>

            </div>
        </section>
    );
};

export default SixthPage;