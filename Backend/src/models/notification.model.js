import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipientId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User", 
        
    },

    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        default: null 
    },

    type: { 
        type: String, 
        enum: ["follow", "contest_invite", "message", "system"], 
        required: true 
    },

    title: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    chatId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Chat", 
        default: null 
    }, 
    isRead: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

// 10 days TTL Index
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 864000 });

export const Notification = mongoose.model("Notification", notificationSchema);