import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },

    content: {
        type: String,
    },

    attachments: [
        {
            public_id: {
                type: String,
                default: ""
            },
            url: {
                type: String,
                default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
        }
    ],
}, { timestamps: true });



const Message = mongoose.model("Message", messageSchema);

export default Message;