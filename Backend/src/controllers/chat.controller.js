import Chat from "../models/chat.model.js";
import { findOtherMember } from "../utils/chat.js";

const createGroup = async (req, res) => {
    // Groupname, members, 
    const { name, members } = req.body;

    //validators

    const allMembers = [...members, req.user._id];// user ids

    try {
        const groupChat = await Chat.create({
            name,
            groupChat: true,
            createdBy: req.user._id,//user id 
            members: allMembers,
        })

        return res.status(201).json({
            success: true,
            message: "Group created successfully",
            data: groupChat
        });


    } catch (error) {
        console.error("Create Group Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating group"
        });
    }

}

const getMyChats = async (req, res) => {
    //find all chats of user
    const allChats = await Chat.find({ members: req.user._id })
        .populate(
            "members",
            "fullname  avatar" //select only these two fields of members
        )

    const transformedChats = allChats.map(({ _id, name, groupChat, members }) => {

        // Agar ye group chat nahi hai, toh dusre user ka data nikaalein
        const getOtherMember = !groupChat ? findOtherMember(members, req.user._id) : null;


        return {
            _id,
            name: groupChat ? name : getOtherMember.fullname,
            groupChat,
            //member me humne avatar and name bhi mnga liya tha , yha hum whi hta rahe hain 
            // bs ids rakh rhe hain 
            members: members.reduce((prev, curr) => {
                if (curr._id.toString() !== req.user._id.toString()) {
                    prev.push(curr._id);
                }
                return prev;
            }, []),
        }
    })

    return res.status(200).json({
        message: "Chats fetched successfully",
        chats : transformedChats,
    })
}

export { createGroup, getMyChats };