import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },

    groupChat :{
        type : Boolean,
        default: false,
    },

    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    members : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, {timestamps: true});