import mongoose from "mongoose";
import Submission from "./submission.model.js";

const testcaseResultSchema = new mongoose.Schema({
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
    },

    testCase: {
        type: Number,
    },

    passed: {
        type: Boolean,
    },

    stdout: {
        type: String,
    },

    expectedOutput: {
        type: String,
    },
    
    stderr: {
        type: String,
    },

    compileOutput: {
        type: String,
    },

    status: {
        type: String,
    }, 

    memory: {
        type: String,
    },

    time: {
        type: String,
    },
    
},{timestamps: true});

const TestcaseResult = mongoose.model("TestcaseResult",testcaseResultSchema);

export default TestcaseResult;