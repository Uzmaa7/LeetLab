import app from "./src/app.js";
import dotenv from "dotenv";
import connectdb from "./src/db/db.js";
import { Events } from "./src/utils/constants.js";
import { scheduleWeeklyContests } from "./src/controllers/contest.controller.js";

dotenv.config();


const port = process.env.PORT || 8000;

// ----------------------------------------------------------
import { createServer } from "http";
import { Server } from "socket.io";
import Message from "./src/models/message.model.js";
const userSocketIDs = new Map();
// import {v4 as uuid} from "uuid";
const server = createServer(app)

const getSockets = (members) => {
    const sockets = members.map((user) => userSocketIDs.get(user._id.toString()));
    return sockets;
}

// // Socket initialization
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Aapke frontend ka URL (e.g., localhost:5173)
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.use((socket, next) => {

})


// Ye "connection" event tab trigger hota hai jab koi user online aata hai
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id); // Har user ki ek unique ID hoti hai

    const user = {
        _id: "abcd",
        fullname: "efghi"
    }

    userSocketIDs.set(user._id.toString(), socket.id);

    socket.on(Events.NEW_MESSAGE, async ({ chatId, members, message }) => {

        const msgForRealTime = {
            content: message,
            // _id: uuid(),
            sender: {
                _id: user._id,
                fullname: user._fullname,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),

        }

        const msgForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        }

        const membersSockets = getSockets(members)
        io.to(membersSockets).emit(Events.NEW_MESSAGE,{ 
            chatId,
            message: msgForRealTime,

        })
        io.to(membersSockets).emit(Events.NEW_MESSAGE_ALERT,{
            chatId
        })

        console.log("NEW Msg", msgForRealTime);

        try {
            await Message.create(msgForDB);
        } catch (error) {
            console.log(error);
        }

    })

    // Jab user disconnect ho
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        userSocketIDs.delete(user._id.toString());
    });
});
// ------------------------------------------------


connectdb()
    .then(() => {
        scheduleWeeklyContests();
        server.listen(port, () => {
            console.log(`server is listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.error("Mongodb connection error", error);
    })