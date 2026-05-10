// src/components/TalkTown/CreatePostModal.jsx
import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

const CreatePostModal = ({ onClose }) => {
    const [postText, setPostText] = useState("");

    const handlePost = () => {
        console.log("Post text:", postText);
        
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 w-full max-w-lg rounded-xl overflow-hidden border border-gray-800">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="font-bold text-lg text-white">Create New Post</h2>
                    <X className="cursor-pointer text-gray-400 hover:text-white" onClick={onClose} />
                </div>

                <div className="p-4">
                    <textarea
                        className="w-full bg-transparent text-white resize-none outline-none text-lg h-40"
                        placeholder="What's on your mind, Dev?"
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    ></textarea>

                    <div className="flex items-center justify-between mt-4">
                        <button className="flex items-center gap-2 text-blue-500 font-semibold hover:bg-blue-500/10 p-2 rounded">
                            <ImageIcon size={20} /> Add Photo
                        </button>
                        
                        <button 
                            onClick={handlePost}
                            disabled={!postText.trim()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;