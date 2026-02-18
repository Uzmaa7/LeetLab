import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";



// ======Router imports==========================
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import executionRouter from "./routes/executeCode.routes.js";
import submissionRouter from "./routes/submission.routes.js";
import listRouter from "./routes/list.routes.js";
import chatRouter from "./routes/chat.routes.js";
import friendRouter from "./routes/friend.routes.js";

dotenv.config({
    path: "./.env"
});



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Aapka Vite frontend URL
    credentials: true
}));
// ----------------------------------------------------------
// import { createServer } from "http";
// import { Server } from "socket.io";
// const server = createServer(app)
// // Socket initialization
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173", // Aapke frontend ka URL (e.g., localhost:5173)
//         credentials: true
//     }
// });



// // Socket Events ka logic
// io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id); // Har user ki ek unique ID hoti hai

//     // Jab user disconnect ho
//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     });
// });
// ------------------------------------------------
app.get("/", (req, res) => {
    res.send("Hello from LeetLab")
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/execute-code", executionRouter);
app.use("/api/v1/submission", submissionRouter);
app.use("/api/v1/list", listRouter);

//==== TalkTown =========================================
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/friend", friendRouter);


export default app;