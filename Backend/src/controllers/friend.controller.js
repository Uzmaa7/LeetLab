//TalkTown
//search users 
//send friend request 
//accept friend request 
//reject request 
//show notifications
//friends

import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Request from "../models/request.model.js"
import { findOtherMember } from "../utils/chat.js";

// Search users in TalkTown who are not yet friends with the logged-in user
const searchUsersInTalkTown = async (req, res) => {
    // 1. Extract the search term from the query parameters

    const { fullname } = req.query;

    try {
        // 2. Find all one-to-one (private) chats where the current user is a member
        const myChats = await Chat.find({
            members: req.user._id,
            groupChat: false
        });

        //3.extract members from mychats 
        const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);// []

        //4. find other users who are not my friends and i have never chated with
        // display them in search panel -> for this we need their id , fullname and avatar

        const usersToExclude = [...allUsersFromMyChats, req.user._id];

        //Query the User collection for potential new friends
        const allUsers = await User.find({
            // Exclude users whose IDs are in the 'usersToExclude' list
            _id: { $nin: usersToExclude },
            // $regex: pattern dhoondta hai, $options: "i" case-insensitive banata hai
            fullname: { $regex: fullname, $options: "i" },
        })

        // 6. Format the user data
        const users = allUsers.map(({ _id, fullname, avatar }) => ({
            _id,
            fullname,
            avatar: avatar.url,
        }))

        return res.status(200).json({
            success: true,
            users,
        })

    } catch (error) {
        console.error("searchUsers error:", error);
        return res.status(500).json({
            success: false,
            message: "Error searching users"
        });
    }

}

const sendRequest = async (req, res) => {

    const { receiverId } = req.body;


    try {

        let request = await Request.findOne({
            $or: [{ sender: req.user._id, receiver: receiverId }, { sender: receiverId, receiver: req.user._id }]
        })

        if (request) {
            return res.status(400).json({
                success: false,
                message: "Request already sent"
            });
        }

        request = await Request.create({
            sender: req.user._id,
            receiver: receiverId
        })

        //emit 443

        return res.status(200).json({
            success: true,
            message: "request sent successfully",
            request
        });
    }

    catch (error) {
        console.error("sendRequest error:", error);
        return res.status(500).json({
            success: false,
            message: "Error sending request"
        });
    }
}

const acceptRequest = async (req, res) => {

    const { requestId, accept } = req.body;

    try {

        const request = await Request.findById(requestId)
            .populate("sender", "fullname avatar")
            .populate("receiver", "fullname avatar")

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        if (request.receiver._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "You are not authorized to accept this request"
            })
        }

        if (!accept) {
            await request.deleteOne();
            return res.status(200).json({
                success: true,
                message: "request rejected",
            });
        }

        const members = [request.sender._id, request.receiver._id];

        await Promise.all([
            Chat.create({
                name: `${request.sender.fullname}-${request.receiver.fullname}`,
                members
            }),

            request.deleteOne(),
        ])

        //emit 453
        return res.status(200).json({
            success: true,
            message: "accept request successfully",
            senderId: request.sender._id,
        });


    } catch (error) {
        console.error("acceptRequest error:", error);
        return res.status(500).json({
            success: false,
            message: "Error in accepting request"
        });
    }
}

const notification = async (req, res) => {

    try {

        const allrequest = await Request.find({ receiver: req.user._id })
            .populate("sender", "fullname avatar")


        if (!allrequest) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        //transforme all request
        const transformed_allrequest = allrequest.map(({ _id, sender }) => ({
            _id,

            sender: {
                _id: sender._id,
                fullname: sender.fullname,
                avatar: sender.avatar.url

            }
        }))

        return res.status(200).json({
            success: true,
            message: "notification received successfully",
            notification: transformed_allrequest
        });


    } catch (error) {
        console.error("notification error:", error);
        return res.status(500).json({
            success: false,
            message: "Error while receiving notification"
        });
    }
}

const myfriends = async (req, res) => {
    const chatId = req.query.chatId;
    try {
        const chats = await Chat.find({
            members: req.user._id,
            groupChat: false,
        })
        .populate("members", "fullname avatar")

        const friends = chats.map(({ members }) => {
            const otherMember = findOtherMember(members, req.user._id);
            return {
                _id: otherMember._id,
                fullname: otherMember.fullname,
                avatar: otherMember.avatar.url,
            }
        })

        if (chatId) {
            const chat = await Chat.findById(chatId);
            const availableFriends = friends.filter((fr) => !chat.members.includes(fr._id));
            return res.status(200).json({
                success: true,
                friends: availableFriends
            })
        }

        else {
            return res.status(200).json({
                success: true,
                friends
            });
        }




    } catch (error) {
        console.error("myfriends error:", error);
        return res.status(500).json({
            success: false,
            message: "Error myfriends"
        });
    }
}

export { searchUsersInTalkTown, sendRequest, acceptRequest, notification, myfriends };