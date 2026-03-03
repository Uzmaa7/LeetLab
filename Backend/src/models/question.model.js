import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    platform: {
        type: String,
        enum: ["Leetcode", "GFG", "Codeforces", "Other"],
        required: true,
    },

    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
    },

    questionUrlOriginal: {
        type: String,
        required: true,
    },

    questionUrlNormalized: {
        type: String,
        required: true,
        index: true
    },

    topics: {
        type: [String],
        index: true,
    },

    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    },

}, { timestamps: true }
)

questionSchema.index({addedBy: 1, title: 1}, {unique: true});

questionSchema.index({addedBy: 1, questionUrlNormalized: 1 , isDeleted: 1},
    {unique: true}
)

questionSchema.index({addedBy: 1, topics: 1}, { unique: true});

questionSchema.index({
    title: "text",
    topics: "text",
    platform: "text"
});

const Question = mongoose.model("Question", questionSchema);

export default Question;