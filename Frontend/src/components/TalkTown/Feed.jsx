










import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

const Feed = () => {
    const posts = [
        { 
            id: 1, 
            user: "Lan", 
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
            image: "/Feed_1.jpg", 
            content: "Late night code discussion with the squad! ☕💻 Discussing system design patterns and optimized database queries.", 
            likes: "1,224",
            time: "2h"
        },
        { 
            id: 2, 
            user: "Serena", 
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            image: "/feed_2.jpg", 
            content: "Today's achievement! 🏆 Secured 1st rank on the leaderboard. Hard work finally paying off.", 
            likes: "856",
            time: "5h"
        },
        { 
            id: 3, 
            user: "Wootok", 
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            image: "/feed_5.jpg", 
            content: "Contest Alert! 🏆 Tonight at 8:00 PM. Interested? Come and join the fun!", 
            likes: "25K",
            time: "3h"
        }
    ];




    return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {/* Background Fixed  */}
        <div 
            className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/feed_4.png')" }}
        ></div>
        <div className="fixed inset-0 bg-black/50 z-10 pointer-events-none"></div>

        {/* Posts Layer */}
        <div className="relative z-20 w-full flex flex-col items-center">
            {posts.map(post => (
                // each post will take full screen height and snap to it when scrolling
                <div key={post.id} className="w-full h-screen flex items-center justify-center snap-start">
                    
                    <div className="w-full max-w-[420px] max-h-[85vh] flex flex-col border border-zinc-700/50 bg-black/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl overflow-hidden">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <img src={post.avatar} alt={post.user} className="w-8 h-8 rounded-full" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-[14px] text-white leading-tight">{post.user}</span>
                                    <span className="text-zinc-400 text-[11px]">{post.time} ago</span>
                                </div>
                            </div>
                            <MoreHorizontal className="text-zinc-400" size={18} />
                        </div>

                        {/* Image Container */}
                        <div className="w-full flex-grow overflow-hidden rounded-lg bg-zinc-900 flex items-center justify-center">
                            <img 
                                src={post.image} 
                                alt="Post" 
                                className="w-full h-full object-contain" 
                            />
                        </div>

                        {/* Footer*/}
                        <div className="flex-shrink-0 pt-3">
                            <div className="flex justify-between text-white">
                                <div className="flex gap-4">
                                    <Heart size={22} />
                                    <MessageCircle size={22} />
                                    <Send size={22} />
                                </div>
                                <Bookmark size={22} />
                            </div>
                            <div className="mt-2 text-white">
                                <p className="text-[13px] font-bold">{post.likes} likes</p>
                                <p className="text-[13px] mt-1 line-clamp-2">
                                    <span className="font-bold mr-2">{post.user}</span>
                                    <span className="text-zinc-300">{post.content}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default Feed;

