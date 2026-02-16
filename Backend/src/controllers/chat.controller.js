import Chat from "../models/chat.model.js";

const createGroup = async (req, res) => {
    // Groupname, members, 
    const { name, members } = req.body;

    //validators

    const allMembers = [...members, req.user];// user ids

    try {
        const groupChat = await Chat.create({
            name,
            groupChat: true,
            createdBy: req.user,//user id 
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

export { createGroup };