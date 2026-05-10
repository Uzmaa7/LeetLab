import React, { useState, useEffect } from 'react';
import { X, Users, Check, Loader2 } from 'lucide-react';
import { getMyFriendsService } from '../../services/friend.service';
import { createGroupService } from '../../services/chat.service';
import { useChat } from '../../contexts/ChatContext';

const CreateGroupModal = ({ onClose }) => {
    const [groupName, setGroupName] = useState("");
    const [friends, setFriends] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]); // Array of IDs
    const [loading, setLoading] = useState(false);
    const [fetchingFriends, setFetchingFriends] = useState(true);
    
    const { fetchChats } = useChat();

    // 1. Fetch Friends to show in selection list
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const data = await getMyFriendsService();
                setFriends(data.friends || []);
            } catch (err) {
                console.error("Error loading friends:", err);
            } finally {
                setFetchingFriends(false);
            }
        };
        fetchFriends();
    }, []);

    // 2. Member Select/Deselect Logic
    const toggleMember = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    };

    // 3. Create Group Handler
    const handleCreate = async () => {
        if (!groupName.trim()) return alert("Please enter a group name");
        if (selectedMembers.length < 2) return alert("Select at least 2 friends to form a group");

        setLoading(true);
        try {
            const res = await createGroupService({
                name: groupName,
                members: selectedMembers
            });
            if (res.success) {
                alert("Group created successfully!");
                fetchChats(); // Sidebar refresh
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
                
                {/* Header */}
                <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600/10 rounded-lg">
                            <Users className="text-blue-500" size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-white">Create New Group</h2>
                    </div>
                    <X className="cursor-pointer text-zinc-500 hover:text-white transition" onClick={onClose} />
                </div>

                <div className="p-6 space-y-6">
                    {/* Group Name Input */}
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Group Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 mt-2 text-white outline-none focus:border-blue-600 transition"
                            placeholder="Ex: LeetLab Coders"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>

                    {/* Friend Selection List */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Select Friends</label>
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
                                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                                            selectedMembers.includes(friend._id) 
                                            ? 'bg-blue-600/10 border-blue-600/50' 
                                            : 'bg-zinc-900/50 border-transparent hover:bg-zinc-900'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={friend.avatar} className="w-10 h-10 rounded-full border border-zinc-800" alt="" />
                                            <span className="text-sm font-medium text-zinc-200">{friend.fullname}</span>
                                        </div>
                                        {selectedMembers.includes(friend._id) && (
                                            <div className="bg-blue-600 rounded-full p-1">
                                                <Check size={12} className="text-white" strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-zinc-600 text-sm py-10">No friends to add. Connect with people first!</p>
                            )}
                        </div>
                    </div>

                    {/* Create Button */}
                    <button 
                        disabled={loading || selectedMembers.length < 2}
                        onClick={handleCreate}
                        className={`w-full py-4 rounded-2xl font-bold transition-all flex justify-center items-center gap-2 ${
                            selectedMembers.length >= 2 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20' 
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Start Group Chat"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;