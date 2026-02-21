import mongoose, { mongo } from "mongoose";

const contestSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    problems: [{
        title: {type : String},
        link: {type: String, required : true},
        difficulty: {type: String},
    }],
    duration: {
        type: Number,
        default: 60,
    },
    start: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active",
    },
    results: [{
        problemLink: String,
        isSolved: {type:Boolean, default: false},
        solvedAt: Date
    }]

}, {timestamps: true});

const Contest = mongoose.model("Contest", contestSchema);

export default Contest;