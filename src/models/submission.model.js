import mongoose from "mongoose";
import { AvailableSubmissionStatus, SubmissionStatus } from "../utils/constants.js";
import User from "./user.model.js"
import Problem from "./problem.model.js"

const submissionSchema = new mongoose.Schema({
    submitBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    problem : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },

    // sourceCode: {

    // },

    language : {
        type : String,
        required:true,
    },

    stdin : {
        type : String,
    },

    stdout: {
        type : String,
    },

    stderr : {
        type: String,
    },

    compileOutput : {
        type: String,
    },

    status: {
        type : String,
        enum: AvailableSubmissionStatus,
        default: SubmissionStatus.PROCESSING,
    },

    memory: {
        type: String,
    },

    time: {
        type: String,
    }

}, {timestamps: true});

const Submission = mongoose.model("Submission",submissionSchema);

export default Submission;