import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ======Router imports==========================
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";
import executionRouter from "./routes/executeCode.routes.js";


dotenv.config({
    path: "./.env"
});



const app = express();

app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
    res.send("Hello from LeetLab")
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/problems", problemRouter);
app.use("/api/v1/execute-code", executionRouter);




export default app;