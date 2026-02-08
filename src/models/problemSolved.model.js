import mongoose from "mongoose";
import User from "./user.model.js";
import Problem from "./problem.model.js";

const problemSolvedSchema = new mongoose.Schema({
    solvedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    problem :{
        type: mongoose.Schema.Types.ObjectId,
        ref :"Problem"
    },

    

}, {timestamps: true});

const ProblemSolved = mongoose.model("ProblemSolved",problemSolvedSchema);

export default ProblemSolved;