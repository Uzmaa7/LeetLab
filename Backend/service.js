import app from "./src/app.js";
import dotenv from "dotenv";
import connectdb from "./src/db/db.js";
import { Events } from "./src/utils/constants.js";
import User from "./src/models/user.model.js";
import Message from "./src/models/message.model.js";
dotenv.config();


const port = process.env.PORT || 8000;

// ----------------------------------------------------------
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app)

const userSocketIDs = new Map(); // { userId: socketId }

// Socket initialization
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});


// Socket Middleware to verify JWT
io.use(async (socket, next) => {
    try {

        const token = socket.handshake.auth?.token ||
            socket.handshake.headers?.token ||
            socket.handshake.query?.token;

        if (!token) {
            console.log("Socket Auth Failed: No Token found");
            return next(new Error("Authentication error: No token provided"));
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select("fullname");

        if (!user) {
            return next(new Error("User not found"));
        }


        socket.user = {
            ...decoded,
            fullname: user.fullname
        };

        console.log(`Socket Verified for: ${socket.user.fullname}`);
        next();

    } catch (err) {
        console.error("Socket JWT Error:", err.message);
        return next(new Error("Authentication error: Invalid Token"));
    }
});

//trigeers when a user come online
io.on("connection", async (socket) => {
    const userId = socket.user._id.toString();

    const user = await User.findById(userId).select("fullname");
    const userName = user?.fullname || "Unknown User";

    //  save the userId and socketId in map
    userSocketIDs.set(userId, socket.id);
    console.log(`User connected: ${userName} (${socket.id})`);

    // 1. Emit the updated online users list to everyone
    io.emit("ONLINE_USERS", Array.from(userSocketIDs.keys()));

    //  2. Listen for new messages from this socket
    socket.on("NEW_MESSAGE_SENT", (data) => {
        const { chatId, message, members } = data;

        //
        members.forEach((memberId) => {
            // don't send the message to the sender
            if (memberId === socket.user._id.toString()) return;

            const recipientSocketId = userSocketIDs.get(memberId);
            if (recipientSocketId) {
                // send the message to the recipient
                io.to(recipientSocketId).emit("MESSAGE_RECEIVED", {
                    chatId,
                    message: {
                        _id: message._id,
                        content: message.content,
                        sender: message.sender,
                        createdAt: message.createdAt || new Date().toISOString(),
                        chat: chatId
                    }
                });
            }
        });
    });

    // 3. Listen for "Mark as Read" events
    socket.on("MARK_AS_READ", async(data) => {
        const { chatId, senderId, userId } = data;

        // send notification to the sender that their message has been seen
        try {
            // Update the status of all messages from 'sent' to 'seen' for this chat and sender
            await Message.updateMany(
                { chat: chatId, sender: senderId, status: "sent" },
                { $set: { status: "seen" } }
            );

            // Notify the sender about the seen status update
            const senderSocketId = userSocketIDs.get(senderId);
            if (senderSocketId) {
                io.to(senderSocketId).emit("MESSAGE_SEEN_UPDATE", { chatId, seenBy: userId });
            }
        } catch (err) {
            console.error("Error updating seen status:", err);
        }
    });

    socket.on("disconnect", () => {

        console.log("User disconnected:", socket.id);
        // Update online list for everyone
        if (userSocketIDs.get(userId) === socket.id) {
            userSocketIDs.delete(userId);
            io.emit("ONLINE_USERS", Array.from(userSocketIDs.keys()));
        }
    });
});


// ... socket initialization ke baad
app.set("io", io); // Isse hum controller mein io access kar payenge
app.set("userSocketIDs", userSocketIDs); // Isse hum mapping access kar payenge
// ------------------------------------------------


connectdb()
    .then(() => {


        server.listen(port, () => {
            console.log(`server is listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.error("Mongodb connection error", error);
    })