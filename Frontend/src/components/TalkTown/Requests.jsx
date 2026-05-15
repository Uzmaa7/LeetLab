
import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { getNotificationsService, acceptRequestService, rejectRequestService } from '../../services/friend.service';
import { useChat } from '../../contexts/ChatContext';

import { useSocket } from '../../contexts/SocketContext';

const Requests = () => {
    const [notifications, setNotifications] = useState([]);
    const { fetchChats } = useChat(); // Chat list refresh karne ke liye

    const { newRequest, setNewRequest } = useSocket();

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


    useEffect(() => {
        if (newRequest) {
            setNotifications((prev) => {
                const exists = prev.find(n => n._id === newRequest.requestId);
                if (exists) return prev;

                // format the new request to match existing notifications
                const formattedRequest = {
                    _id: newRequest.requestId,
                    sender: newRequest.sender
                };

                return [formattedRequest, ...prev];
            });
            setNewRequest(null);
        }
    }, [newRequest, setNewRequest]);

    useEffect(() => {
        if (newRequest?.type === 'CANCEL') {
            setNotifications(prev => prev.filter(n => n._id !== newRequest.requestId));
            setNewRequest(null);
        }
    }, [newRequest]);

    

    const handleDecision = async (requestId, accept) => {
        try {
            let data;

            // 1. Service call based on decision
            if (accept) {
                data = await acceptRequestService(requestId, accept);
            } else {
                data = await rejectRequestService(requestId);
            }

            // 2. Common UI Update
            if (data?.success) {
                // Decision chahe accept ho ya reject, notification list se toh remove hona hi chahiye
                setNotifications(prev => prev.filter(n => n._id !== requestId));

                // 3. Agar accept hua hai, toh chats refresh karo
                if (accept) {
                    fetchChats();
                }

                console.log(accept ? "Request accepted!" : "Request rejected!");
            }
        } catch (err) {
            console.error("Error handling request:", err);
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