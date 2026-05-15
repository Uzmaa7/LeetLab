
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useUserContext } from './UserContext';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user, authToken } = useUserContext();
    const [newRequest, setNewRequest] = useState(null);
    const [requestCount, setRequestCount] = useState(0);

    useEffect(() => {
        if (user && authToken) {
            const newSocket = io("http://localhost:8080", {
                auth: { token: authToken },
                withCredentials: true
            });

            setSocket(newSocket);

            // --- Listen for Online Users ---
            newSocket.on("ONLINE_USERS", (users) => {
                console.log("Receiving Online Users:", users);
                setOnlineUsers(users); // Ye state update hogi
            });

            // --- Listen for New Friend Requests ---
            newSocket.on("NEW_FRIEND_REQUEST", (data) => {
                // console.log("New Request Received:", data);
                setNewRequest(data); // Store request data
                // you can also show a toast notification here if you want
                setRequestCount(prev => prev + 1)
            });

            // --- Listen for Accepted Request (Sender side update) ---
            newSocket.on("FRIEND_REQUEST_ACCEPTED", (data) => {
                // you can show a toast notification to the sender that their request was accepted
                toast.success(`${data.receiverName} accepted your friend request`, {
                    style: {
                        borderRadius: '10px',
                        background: '#18181b', 
                        color: '#fff',
                        border: '1px solid #27272a'
                    },
                });
                // Optionally, you can also update the online users list or any relevant state here
                // console.log("Friend Request Accepted:", data);
            });

            // --- Listen for Rejected Request (Sender side update) ---
            newSocket.on("FRIEND_REQUEST_REJECTED", (data) => {
                
                toast.error(`${data.receiverName} declined your friend request`, {
                    style: {
                        borderRadius: '10px',
                        background: '#18181b', 
                        color: '#fff',
                        border: '1px solid #27272a'
                    },
                });
            });

            // --- Listen for Cancelled Request (Sender side update) ---
            newSocket.on("FRIEND_REQUEST_CANCELLED", (data) => {
                // Ye tab kaam aayega jab user Notifications page par baitha ho aur sender request cancel karde
                setNewRequest({ type: 'CANCEL', requestId: data.requestId });
            });

            return () => {
                newSocket.off("ONLINE_USERS"); // Cleanup listener
                newSocket.off("NEW_FRIEND_REQUEST");
                newSocket.off("FRIEND_REQUEST_ACCEPTED");
                newSocket.off("FRIEND_REQUEST_REJECTED");
                newSocket.off("FRIEND_REQUEST_CANCELLED");
                newSocket.close();
            };
        }
    }, [user, authToken]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, newRequest, setNewRequest, requestCount, setRequestCount }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);