import mongoose from "mongoose";
import { AvailableProblemDifficultyLevel, ProblemDifficultyLevel } from "../utils/constants.js";


const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    difficulty: {
        type: String,
        enum : AvailableProblemDifficultyLevel,
        default: ProblemDifficultyLevel.EASY
    },

    tags: {
        type: [String]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    examples: [{
        input:String,
        output:String,
        explanation:String,
    }],

    constraints: {
        type: String,
        required: true,
    },

    hints: {
        type: String
    },

    editorial: {
        type: String
    },

    testcases: [{
        input: String,
        output: String,
    }],

    codeSnippets: {
        type: Map,
        of: String,
    },

    referenceSolution: {
        type: Map,
        of: String,
        required: true,
    },

    solvedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProblemSolved"
    }]


}, {timestamps:true});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;