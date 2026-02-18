//TalkTown
//search users 
//send friend request 
//accept friend request 
//reject request 

import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Request from "../models/request.model.js"

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
            $or: [{sender: req.user._id, receiver: receiverId}, {sender: receiverId, receiver : req.user._id}]
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



export { searchUsersInTalkTown, sendRequest };