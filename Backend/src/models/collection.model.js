import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    name: {
        type: String,
        required: true,
        index: true,
        maxLength: 50,
        trim: true,
    },

    nameLower: {
        type: String,
        required: true,
        index: true,
    },

    description: {
        type: String,
        maxLength: 100,
    },

    isPrivate: {
        type: Boolean,
        default: false,
    },

    questionsCount: {
        type: Number,
        default: 0,
    },


}, { timestamps: true }
)


collectionSchema.index({createdBy: 1, nameLower: 1}, {unique: true});

collectionSchema.index({ ownerId: 1, name: 1 });

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;