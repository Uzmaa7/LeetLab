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


problemSolvedSchema.index({ solvedBy: 1, problem: 1 }, { unique: true });


const ProblemSolved = mongoose.model("ProblemSolved",problemSolvedSchema);

export default ProblemSolved;