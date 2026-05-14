
import React, { useEffect, useState } from 'react';
import { X, Edit2, UserMinus, UserPlus, LogOut, Trash2 } from 'lucide-react';
import { getChatDetailsService, renameChatService, removeMemberService,deleteChatService, exitGroupService } from '../../services/chat.service';
import { useUserContext } from '../../contexts/UserContext';
import { useChat } from '../../contexts/ChatContext';

const GroupInfoSidebar = ({ chatId, onClose, onDeleteSuccess }) => {
    const [chatDetails, setChatDetails] = useState(null);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState("");
    const { user: currentUser } = useUserContext();
    const { fetchChats } = useChat();

    const fetchDetails = async () => {
        try {
            // Backend endpoint: /api/v1/chats/:id?populate=true
            const data = await getChatDetailsService(chatId, true);
            setChatDetails(data.chat);
            setNewName(data.chat.name);
        } catch (err) {
            console.error("Details fetch error", err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [chatId]);

    const handleRename = async () => {
        try {
            await renameChatService(chatId, newName);
            setIsEditingName(false);
            fetchDetails();
            fetchChats(); // Sidebar name update
        } catch (err) {
            alert("Rename failed");
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!window.confirm("Remove this member?")) return;
        try {
            await removeMemberService(chatId, userId);
            fetchDetails();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to remove");
        }
    };

    if (!chatDetails) return null;

    const isAdmin = chatDetails.createdBy === currentUser?._id;




return (
        <div className="fixed inset-0 lg:relative lg:w-80 h-full bg-zinc-950 border-l border-zinc-800 flex flex-col z-50 lg:z-30 shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/50 min-h-[64px]">
                <h2 className="font-bold text-white text-base uppercase tracking-widest text-[10px]">Group Info</h2>
                <X className="cursor-pointer text-zinc-500 hover:text-white p-1" size={28} onClick={onClose} />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Avatar Section */}
                <div className="p-6 lg:p-8 flex flex-col items-center gap-4 text-center border-b border-zinc-900">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-zinc-800 flex items-center justify-center text-2xl lg:text-3xl font-bold border-2 border-zinc-700 text-white">
                        {chatDetails.name[0]}
                    </div>

                    {isEditingName ? (
                        <div className="flex items-center gap-2 w-full justify-center">
                            <input
                                className="bg-black border border-zinc-700 rounded px-3 py-1.5 text-sm outline-none w-2/3 text-white focus:border-blue-500"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                autoFocus
                            />
                            <button onClick={handleRename} className="text-blue-500 text-xs font-bold uppercase">Save</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 group max-w-full justify-center">
                            <h3 className="text-lg font-bold text-white truncate px-2">{chatDetails.name}</h3>
                            <Edit2 size={14} className="text-zinc-500 cursor-pointer lg:opacity-0 lg:group-hover:opacity-100" onClick={() => setIsEditingName(true)} />
                        </div>
                    )}
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">
                        {chatDetails.groupChat ? "Group" : "Private"} · {chatDetails.members.length} members
                    </p>
                </div>

                {/* Members List */}
                <div className="p-4">
                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-6">Members</h4>
                    <div className="space-y-5">
                        {chatDetails.members.map((member) => (
                            <div key={member._id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <img src={member.avatar} className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-zinc-900 bg-zinc-800 object-cover" alt="" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-zinc-200 truncate max-w-[150px] lg:max-w-[120px]">
                                            {member.fullname} {member._id === currentUser?._id && "(You)"}
                                        </span>
                                        {member._id === chatDetails.createdBy && <span className="text-[9px] text-blue-500 font-black uppercase tracking-wider">Admin</span>}
                                    </div>
                                </div>
                                {isAdmin && member._id !== currentUser?._id && (
                                    <button onClick={() => handleRemoveMember(member._id)} className="text-zinc-600 hover:text-red-500 transition p-1">
                                        <UserMinus size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Actions Section */}
            <div className="p-4 pb-24 lg:pb-4 border-t border-zinc-900 bg-zinc-900/20">
                {isAdmin ? (
                    <button
                        onClick={async () => {
                            if (window.confirm("Delete this group permanently?")) {
                                try {
                                    const res = await deleteChatService(chatId);
                                    if (res.success) {
                                        onClose();
                                        onDeleteSuccess();
                                    }
                                } catch (err) {
                                    alert("Failed to delete group");
                                }
                            }
                        }}
                        className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 py-3 rounded-xl transition text-xs font-black uppercase tracking-widest border border-red-500/20"
                    >
                        <Trash2 size={16} /> Delete Group
                    </button>
                ) : (
                    <button
                        onClick={async () => {
                            if (window.confirm("Leave this group?")) {
                                try {
                                    await exitGroupService(chatId);
                                    onClose();
                                    fetchChats();
                                } catch (err) {
                                    alert("Failed to leave group");
                                }
                            }
                        }}
                        className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 py-3 rounded-xl transition text-xs font-black uppercase tracking-widest border border-red-500/20"
                    >
                        <LogOut size={16} /> Leave Group
                    </button>
                )}
            </div>
        </div>
    );
};

export default GroupInfoSidebar;