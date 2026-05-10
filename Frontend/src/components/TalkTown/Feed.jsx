// src/components/TalkTown/Feed.jsx
import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

const Feed = () => {
    // Dummy posts data - baad mein backend se fetch karenge
    const posts = [
        { id: 1, user: "CodeMaster", content: "Just solved a Hard problem on LeetLab! 🚀", likes: 24 },
        { id: 2, user: "Dev_Arjun", content: "TalkTown feature is coming along great.", likes: 15 }
    ];

    return (
        <div className="max-w-[600px] w-full py-8 px-4 flex flex-col gap-6">
            {posts.map(post => (
                <div key={post.id} className="border border-gray-800 rounded-lg p-4 bg-zinc-950">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"></div>
                        <span className="font-semibold">{post.user}</span>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-gray-200">{post.content}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <Heart className="cursor-pointer hover:text-red-500 transition" size={24} />
                            <MessageCircle className="cursor-pointer hover:text-gray-400 transition" size={24} />
                            <Send className="cursor-pointer hover:text-blue-400 transition" size={24} />
                        </div>
                        <Bookmark className="cursor-pointer hover:text-yellow-400 transition" size={24} />
                    </div>
                    <p className="mt-2 text-sm font-semibold">{post.likes} likes</p>
                </div>
            ))}
        </div>
    );
};

export default Feed;


