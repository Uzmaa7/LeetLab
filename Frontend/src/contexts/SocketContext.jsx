
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useUserContext } from './UserContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user, authToken } = useUserContext(); 


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

        return () => {
            newSocket.off("ONLINE_USERS"); // Cleanup listener
            newSocket.close();
        };
    }
}, [user, authToken]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);