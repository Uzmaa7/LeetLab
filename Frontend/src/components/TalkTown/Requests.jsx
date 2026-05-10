
import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { getNotificationsService, acceptRequestService } from '../../services/friend.service';
import { useChat } from '../../contexts/ChatContext';

const Requests = () => {
    const [notifications, setNotifications] = useState([]);
    const { fetchChats } = useChat(); // Chat list refresh karne ke liye

    const fetchNotifications = async () => {
        try {
            const data = await getNotificationsService();
            setNotifications(data.notification);
        } catch (err) {
            console.error("Error fetching notifications", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleDecision = async (requestId, accept) => {
        try {
            const data = await acceptRequestService(requestId, accept);
            if (data.success) {
                // List se remove kardo process hone ke baad
                setNotifications(prev => prev.filter(n => n._id !== requestId));
                // Agar accept kiya hai, toh chat list refresh karo taaki naya friend dikhe
                if (accept) fetchChats();
            }
        } catch (err) {
            console.error("Error handling request", err);
        }
    };

    return (
        <div className="max-w-[500px] w-full py-10 px-4">
            <h2 className="text-xl font-bold text-white mb-8">Friend Requests</h2>
            
            <div className="flex flex-col gap-4">

                {notifications.length > 0 ? (

                    notifications.map((notif) => (
                        
                        <div key={notif._id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={notif.sender.avatar} 
                                    className="w-11 h-11 rounded-full border border-zinc-700 object-cover" 
                                    alt="avatar" 
                                />
                                <div>
                                    <p className="text-white font-semibold text-sm">{notif.sender.fullname}</p>
                                    <p className="text-zinc-500 text-[11px]">wants to connect</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleDecision(notif._id, true)}
                                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
                                >
                                    <Check size={18} strokeWidth={3} />
                                </button>
                                <button 
                                    onClick={() => handleDecision(notif._id, false)}
                                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-full transition"
                                >
                                    <X size={18} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p className="text-zinc-600 text-sm italic font-medium">No pending requests</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Requests;