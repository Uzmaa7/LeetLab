import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ======Router imports==========================
import authRouter from "./routes/auth.routes.js";
import problemRouter from "./routes/problem.routes.js";


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




export default app;