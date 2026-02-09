import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controller.js";



const executionRouter = express.Router();



executionRouter.post("/", verifyJWT, executeCode);


export default executionRouter;