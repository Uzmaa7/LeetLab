import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
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
    const { chatId, members } = req.body;

    try {
        // find the chat in which you want to add members
        const chat = await Chat.findById(chatId);

        if (!chat || !chat.groupChat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            })
        }

        // only admin can add members
        if (chat.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Only admin can add members"
            })
        }

        // if the member is already added 
        // some -> kya ek br bhi meri condition true ho rhi hai -> return true;
        const alreadyAdded = members.some((id) => chat.members.includes(id));
        if (alreadyAdded) {
            return res.status(400).json({
                success: false,
                message: "members are already added in the group"
            })
        }

        //Limit Check
        if (chat.members.length + members.length > 5) {
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

    const { chatId, userRemoveId } = req.body;

    try {
        const chat = await Chat.findById(chatId);
        const userRemove = await User.findById(userRemoveId).select("fullname");

        if (!userRemove) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        if (!chat || !chat.groupChat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            })
        }

        // 1. Authorization: Only admin can remove
        if (chat.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Only admin can add members"
            })
        }

        // 2. Does userRemove exist in this group ?
        const userExist = chat.members.some((id) => id.toString() === userRemoveId.toString())

        if (!userExist) {
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

const exitGroup = async (req, res) => {

    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);
    if (!chat || !chat.groupChat) {
        return res.status(404).json({
            success: false,
            message: "Chat not found",
        })
    }

    // 1. Check if user is actually a member

    const isMember = chat.members.some((id) => id.toString() === req.user._id.toString())

    if (!isMember) {
        return res.status(400).json({
            message: "You are not a member of this group"
        })
    }

    //if admin wants to exit the group
    //delete the group
    if (req.user._id.toString() === chat.createdBy.toString()) {
        await Chat.findByIdAndDelete(chatId);
        return res.status(200).json({
            success: true,
            message: "Group deleted because admin left"
        });
    }



    //update chat.members
    chat.members = chat.members.filter((id) => id.toString() !== req.user._id.toString());

    // chat save
    await chat.save();

    return res.status(200).json({
        success: true,
        message: "You left the group successfully",
    });

    // emit 256

}

const sendAttachment = async (req, res) => {
    // Jab hum Multer use karte hain, toh woh hamari file ko public / images
    //  folder mein save karne ke baad humein ek Object deta hai.

    //  Jab aap upload.array("files") use karti hain, toh req.files ke andar har ek file 
    //  ka structure aisa hota hai:

    // {
    //     fieldname: 'files',
    //     originalname: 'my-photo.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: './public/images', // Jahan file save hui
    //     filename: '170818...-photo.jpg', // Jo unique naam Multer ne diya
    //     path: 'public/images/170818...-photo.jpg', // <--- YE HAI ASLI CHEEZ
    //     size: 50000
    // }


    const { chatId } = req.body;

    const files = req.files || []; //[{}, {}. {}]

    if (files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "please provide attachment",
        })
    }

    // Step 1: Har file ko Cloudinary par bhejo (Parallelly)
    const uploadPromises = files.map((file) => uploadOnCloudinary(file.path));

    // Step 2: Sabka wait karo (Promise.all)
    const results = await Promise.all(uploadPromises);

    // Step 3: Cloudinary se jo URLs aaye hain, unhe filter karke clean karo
    const attachments = results.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
    }));


    // create a message
    const messageForDB = {
        sender: req.user._id,
        chat: chatId,
        content: "",
        attachments: attachments,
    }
    const message = await Message.create(messageForDB);


    return res.status(200).json({
        success: true,
        attachments
    });

    //emit 39
}

const getChatDetails = async (req, res) => {

    // agr user ko details chahiye
    if (req.query.populate === "true") {
        const chat = await Chat.findById(req.params.id)
            .populate
            ("members", "fullname avatar")
            .lean()

        // Jab aap .lean() use karti hain, toh Mongoose aapko asli register nahi deta, 
        // balki us register ke ek page ki Photocopy (Plain JS Object) nikaal kar deta hai.

        // Aapne photocopy li.
        // Aapne us photocopy par pen se kuch changes kiye(yani chat.members.map(...)).
        // Kya asli register mein changes hue ? * Jawab hai: NAHI.
        // Database mein tabhi save hota hai jab hum asli register(Mongoose Document) par kaam karte hain aur uske baad.save() function call karte hain. .lean() use karne par humein.save() function milta hi nahi hai.


        // GET Requests mein: Jab aapko sirf data Dikhana (Read) hai 
        // aur us par koi .save() ya .update() nahi chalana, toh hamesha
        // .lean() use karein. Yeh response time fast kar deta hai.

        // Fayda 1 (Speed): Photocopy nikaalna (Plain Object) asli register utha kar laane se bahut fast hota hai.
        //Fayda 2 (Customization): Humein frontend ko saara data (jaise password ya extra fields) nahi bhejna tha. Isliye humne photocopy par apna "map" chalaya aur sirf kaam ka data (fullname, url) filter karke user ko bhej diya.

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            })
        }

        chat.members = chat.members.map(({ _id, fullname, avatar }) => ({
            _id,
            fullname,
            avatar: avatar.url
        }))



        return res.status(200).json({
            success: true,
            chat,
        })
    }
    // simple request, no details of members
    else {

        const chat = await Chat.findById(req.params.id).lean()
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            })
        }
        return res.status(200).json({
            success: true,
            chat,
        })

    }
}

const renameChat = async (req, res) => {

    const chatId  = req.params.id;
    const { name } = req.body;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat || !chat.groupChat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            })
        }

        // rename feature hum sbko de rhe hain
        const user = req.user;

        //Only group members are allowed to rename the group ?
        const isMember = chat.members.some((id) => id.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(404).json({
                success: false,
                message: "Only members are allowed to rename the group"
            })
        }

        chat.name = name;
        await chat.save();

        //emit 323

        return res.status(200).json({
            success: true,
            message: "Group renamed successfully",
            user,
        })
    } catch (error) {
        console.error("renameChat Error:", error);
        return res.status(500).json({
            success: false,
            message: " error while renaming the group"
        });
    }


}

export {
    createGroup, getMyChats, getMyGroups, addMembers, removeMember,
    exitGroup, sendAttachment, getChatDetails, renameChat
};