import React, { useState, useEffect } from 'react';
import { X, UserPlus, Check, Loader2 } from 'lucide-react';
import { getMyFriendsService } from '../../services/friend.service';
import { addMembersService } from '../../services/chat.service'; 
import { useChat } from '../../contexts/ChatContext';

const AddMemberModal = ({ onClose, chatId }) => {
    const [friends, setFriends] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingFriends, setFetchingFriends] = useState(true);
    
    const { fetchChats } = useChat();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
              
                const data = await getMyFriendsService(chatId);
                setFriends(data.friends || []);
            } catch (err) {
                console.error("Error loading friends:", err);
            } finally {
                setFetchingFriends(false);
            }
        };
        fetchFriends();
    }, [chatId]);

    const toggleMember = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    };

    const handleAdd = async () => {
        if (selectedMembers.length < 1) return alert("Select at least 1 friend");

        setLoading(true);
        try {
            const res = await addMembersService(chatId, selectedMembers);
            if (res.success) {
                alert("Members added successfully!");
                fetchChats(); 
                onClose();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
            <div className="bg-zinc-950 w-full max-w-md border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                
                <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600/10 rounded-lg text-blue-500">
                            <UserPlus size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-white">Add New Members</h2>
                    </div>
                    <X className="cursor-pointer text-zinc-500 hover:text-white" onClick={onClose} />
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold text-zinc-500 tracking-widest">Available Friends</label>
                            <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                                {selectedMembers.length} Selected
                            </span>
                        </div>
                        
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {fetchingFriends ? (
                                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-zinc-700" /></div>
                            ) : friends.length > 0 ? (
                                friends.map((friend) => (
                                    <div 
                                        key={friend._id}
                                        onClick={() => toggleMember(friend._id)}
                                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer border ${
                                            selectedMembers.includes(friend._id) 
                                            ? 'bg-blue-600/10 border-blue-600/50' 
                                            : 'bg-zinc-900/50 border-transparent hover:bg-zinc-900'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={friend.avatar} className="w-10 h-10 rounded-full border border-zinc-800 object-cover" alt="" />
                                            <span className="text-sm font-medium text-zinc-200">{friend.fullname}</span>
                                        </div>
                                        {selectedMembers.includes(friend._id) && (
                                            <div className="bg-blue-600 rounded-full p-1"><Check size={12} className="text-white" strokeWidth={4} /></div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-zinc-600 text-sm py-10">All your friends are already in this group.</p>
                            )}
                        </div>
                    </div>

                    <button 
                        disabled={loading || selectedMembers.length < 1}
                        onClick={handleAdd}
                        className="w-full py-4 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:bg-zinc-800 disabled:text-zinc-500 transition-all flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Add to Group"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;