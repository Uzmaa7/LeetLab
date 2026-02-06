import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";



dotenv.config({
    path: "./.env"
});



const app = express();

app.use(express.json());




app.get("/", (req, res) => {
    res.send("Hello from LeetLab")
});



app.use("/api/v1/auth", authRouter);




export default app;