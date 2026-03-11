import mongoose, { mongo } from "mongoose";

const contestSchema = new mongoose.Schema({
    contestCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },

    // Ab ye sirf ID nahi, balki platform questions aur external links ka mix handle karega
    questions: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question", // if this question is from our DB
                required: false,
            },
            isExternal: {
                type: Boolean,
                default: false, 
            },
            externalUrl: String,   // Link share by user for external question
            externalTitle: String, // title of the question if it's external (optional, can be fetched from URL if needed)
            externalPlatform: {
                type: String,
                enum: ["leetcode", "gfg", "codeforces", "other"],
            }
        }
    ],

    durationInMin: {
        type: Number,
        required: true,
    },
    startsAt: Date,
    endsAt: Date,
    visibility: {
        type: String,
        enum: ["private", "shared", "public"],
        default: "private",
    },
    status: {
        type: String,
        enum: ["upcoming", "live", "ended"],
        default: "upcoming",
    },
},
    { timestamps: true })

contestSchema.index({ endsAt: 1 });

contestSchema.pre("save", function () {
    // Only for new contests
    if (this.isNew) {
        this.status = "upcoming";
    }
});


contestSchema.statics.expireContests = async function () {

    await this.updateMany(
        { status: "live", endsAt: { $lte: new Date() } },
        { $set: { status: "ended" } }
    );
};


const Contest = mongoose.model("Contest", contestSchema);

export default Contest;