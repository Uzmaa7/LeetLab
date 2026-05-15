import React, { useState } from 'react';
import { X, Search as SearchIcon, UserPlus, Loader2,XCircle } from 'lucide-react';
import { searchUsersService, sendRequestService ,cancelRequestService} from '../../services/friend.service';

const SearchModal = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        const val = e.target.value;
        setSearchQuery(val);

        if (val.trim().length > 0) {
            setLoading(true);
            try {
                //  backend: /friend/search?fullname=...
                const data = await searchUsersService(val);
                // data.users = [{user1}, {User2}, {user3}]
                setUsers(data.users || []);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        } else {
            setUsers([]);
        }
    };

    // const handleSendRequest = async (id) => {
    //     try {
    //         const data = await sendRequestService(id);
    //         if (data.success) {
    //             alert("Request sent successfully!");
                
    //             // setUsers(prev => prev.filter(user => user._id !== id));
    //         }
    //     } catch (err) {
    //         alert(err.response?.data?.message || "Failed to send request");
    //     }
    // };


    // --- Unified Handler for Send and Cancel ---
    const handleRequestAction = async (userId, isSent) => {
        try {
            if (isSent) {
                // if request is already sent, then cancel it
                const data = await cancelRequestService(userId);
                if (data.success) {
                    // update UI: requestSent false kardo
                    setUsers(prev => prev.map(u => u._id === userId ? { ...u, requestSent: false } : u));
                }
            } else {
                // if request is not sent, then send it
                const data = await sendRequestService(userId);
                if (data.success) {
                    // update UI: requestSent true kardo
                    setUsers(prev => prev.map(u => u._id === userId ? { ...u, requestSent: true } : u));
                }
            }
        } catch (err) {
            console.error("Action failed:", err);
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-zinc-950 w-full max-w-md border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                    <h2 className="text-lg font-bold">Search Users</h2>
                    <X className="cursor-pointer text-zinc-500 hover:text-white" onClick={onClose} />
                </div>

                {/* Input Area */}
                <div className="p-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="Type a name (e.g. Sameer)" 
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-zinc-600 transition"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                {/* Results Area */}
                <div className="max-h-[350px] overflow-y-auto px-2 pb-4 flex flex-col gap-1">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="animate-spin text-zinc-500" />
                        </div>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <div key={user._id} className="flex items-center justify-between p-3 hover:bg-zinc-900 rounded-xl transition group">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={user.avatar} 
                                        alt={user.fullname} 
                                        className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                                    />
                                    <span className="text-sm font-medium text-zinc-200">{user.fullname}</span>
                                </div>
                                {/* <button 
                                    onClick={() => handleSendRequest(user._id)}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    title="Add Friend"
                                >
                                    <UserPlus size={18} />
                                </button> */}


                                {/* Dynamic Button based on requestSent status */}
                                <button 
                                    onClick={() => handleRequestAction(user._id, user.requestSent)}
                                    className={`p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1
                                        ${user.requestSent ? 'bg-zinc-800 text-red-500 hover:bg-zinc-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    title={user.requestSent ? "Cancel Request" : "Add Friend"}
                                >
                                    {user.requestSent ? (
                                        <X size={18} strokeWidth={2.5} /> // Cancel Icon (Cross)
                                    ) : (
                                        <UserPlus size={18} /> // Add Icon
                                    )}
                                </button>
                                
                            </div>
                        ))
                    ) : searchQuery && (
                        <p className="text-center text-zinc-600 text-sm py-10 italic">No users found to connect with.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;