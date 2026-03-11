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
import questionRouter from "./routes/question.routes.js";
import collectionRouter from "./routes/collection.routes.js";
import collectionQuestionRouter from "./routes/collectionQuestion.routes.js";
import contestRouter from "./routes/contest.routes.js";
import contestMessageRouter from "./routes/contestMessage.routes.js";
import contestParticipantRouter from "./routes/contestParticipants.router.js";  

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



app.get("/", (req, res) => {
    res.send("Hello from LeetLab")
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/execute-code", executionRouter);
app.use("/api/v1/submission", submissionRouter);
app.use("/api/v1/list", listRouter);


// ======= Contest =================================
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/collectionQuestions", collectionQuestionRouter);

app.use("/api/v1/contests", contestRouter);
app.use("/api/v1/contest-messages", contestMessageRouter);
app.use("/api/v1/contest-participants", contestParticipantRouter);

//==== TalkTown =========================================
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/friend", friendRouter);



export default app;