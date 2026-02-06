import mongoose from "mongoose";
import { AvailableProblemDifficultyLevel, ProblemDifficultyLevel } from "../utils/constants.js";


const problemSchema = new mongoose.Schema9({
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
        required: true
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

    codeSnippets: [{
        languages: String,
        code: String,
    }],

    referenceSolution: [
        {
        language: String,
        code: String,
        isOptimal: Boolean // Optional: to mark the best time-complexity solution
        }
    ],



}, {timestamps:true});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;