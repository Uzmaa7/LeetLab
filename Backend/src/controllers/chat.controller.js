import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
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
    try {
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
            chats: transformedChats,
        })

    } catch (error) {
        console.error("getMyChats Error:", error);
        return res.status(500).json({
            success: false,
            message: " error while fetching all the Chats"
        });
    }
}

const getMyGroups = async (req, res) => {
    try {
        // i will find all my chats where groupChat : true and group is created by me
        const allGroupChats = await Chat.find({ members: req.user._id, groupChat: true, createdBy: req.user._id })
            .populate("members", "fullname");

        // groups[] = [group1, group2, group3]
        const groups = allGroupChats.map(({ _id, name, members, groupChat }) =>
        ({
            _id,
            name,
            members,
            groupChat
        })
        );

        return res.status(200).json({
            success: true,
            message: "Groups fetched succesfully",
            groups,
        })

    } catch (error) {
        console.error("getMyGroups Error:", error);
        return res.status(500).json({
            success: false,
            message: " error while fetching all the groups"
        });
    }


}

const addMembers = async (req, res) => {

    //members[] = [id1, id2, id3]
    const {chatId, members} = req.body;

    try {
        // find the chat in which you want to add members
        const chat = await Chat.findById(chatId);
    
        if(!chat || !chat.groupChat){
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            })
        }
    
        // only admin can add members
        if(chat.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: "Only admin can add members"
            })
        }
    
        // if the member is already added 
        // some -> kya ek br bhi meri condition true ho rhi hai -> return true;
        const alreadyAdded = members.some((id) => chat.members.includes(id));
        if(alreadyAdded){
            return res.status(400).json({
                success: false,
                message: "members are already added in the group"
            })
        }

        //Limit Check
        if(chat.members.length + members.length > 5){
            return res.status(400).json({
                message: "Group limit exceeded"
            })
        }
    
        //1. User.findById(id) return a promise;
        //2. newMembersPromise[] = [P1, P2, P3];  -> newMembersPromise ek array hai jisme sirf Promises bhare hain
        //3. Promise.all sare promises ke liye ek sath wait karta hai -> Agar aap ek-ek karke await karte (for loop mein), toh server bahut slow ho jata. Promise.all sabko parallelly (ek saath) fetch karta hai.
        //4. newMembers[] = [{object1}, {object2}, {object3}]  id , fullname
    
        const newMembersPromise = members.map((id) => User.findById(id, "fullname"));
        const newMembers = await Promise.all(newMembersPromise);
        
        //5. Filter out those users who were not found in database
        const people = newMembers
        .filter((m) => m !== null)
        .map((m) => m._id);

        chat.members.push(...people);//ids pushed
    
    
        await chat.save()
    
        return res.status(200).json({
                success: true,
                message: "members added succesfully",
                
        })
    
        //emitevent-> 2:39
    } catch (error) {
        console.error("addMembers Error:", error);
        return res.status(500).json({
            success: false,
            message: " error while adding members to the group"
        });
    }
}

const removeMember = async (req, res) => {

    const {chatId, userRemoveId} = req.body;

    try {
        const chat = await Chat.findById(chatId);
        const userRemove = await User.findById(userRemoveId).select("fullname");
    
        if(!userRemove){
             return res.status(404).json({
                    success: false,
                    message: "User not found",
            })
        }
    
        if(!chat || !chat.groupChat){
            return res.status(404).json({
                    success: false,
                    message: "Chat not found",
            })
        }
    
        // 1. Authorization: Only admin can remove
        if(chat.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success: false,
                message: "Only admin can add members"
            })
        }
    
        // 2. Does userRemove exist in this group ?
        const userExist = chat.members.some((id) =>  id.toString() === userRemoveId.toString() )
    
        if(!userExist){
            return res.status(400).json({
                message: "user must be a member of this chat"
            })
        }
    
        // 3. remove the member from the group
        // filter returns an array []
        chat.members = chat.members.filter((id) => id.toString() !== userRemoveId.toString());
    
    
        await chat.save()
    
        //emitEvent-249
        return res.status(200).json({
                    success: true,
                    message: "members removed succesfully",
                    
            })
    } catch (error) {
        console.error("removeMember Error:", error);
        return res.status(500).json({
            success: false,
            message: " error while removing  member from the group"
        });
    }
}





export { createGroup, getMyChats, getMyGroups, addMembers, removeMember, exitGroup };