import mongoose from "mongoose";

const problemsInListSchema = new mongoose.Schema({
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    },

    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
    },

}, {timestamps: true});

problemsInListSchema.index({ list: 1, problem: 1 }, { unique: true });
const ProblemsInList = mongoose.model("ProblemsInList",problemsInListSchema);

export default ProblemsInList;