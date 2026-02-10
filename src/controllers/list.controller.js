import List from "../models/list.model";

const createList = async (req, res) => {
    try {
        const {title, description} = req.body;
        const userId = req.user._id;

        const list = await List.create({title, description, createdBy: userId});

        return res.status(200).json({
            success: true,
            message: "List created Successfully",
            list,
        })

    } catch (error) {
        console.log("createList", error);
        return res.status(500).json({
            message: "Failed to create List",
        })
        
    }
}

const getAllLists = async(req, res) => {
    try {
        const userId = req.user._id;
        const allLists = await List.find({ createdBy: userId })
        .populate({ 
            path: 'problemsInList', 
            populate: {
                path: 'problem' 
            }
        });

        res.status(200).json({
            success: true,
            message: "All Lists fetched successfully",
            allLists
        });

    } catch (error) {
        console.error("getAllLists", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch All Lists" 
        });
    }
}

const getAList = async (req, res) => {
    try {
        const {listId} = req.params;
        const user = req.user;
        const list = await List.findOne({_id: listId, createdBy: user._id, })
        .populate({
                path: 'problemsInList', 
                populate: {
                    path: 'problem' 
                }
        });

        if(!list){
            return res.status(404).json({
                message: "List not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "A list fetched successfully",
            list
        });
    } catch (error) {
        console.error("getAList", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch A List" 
        });
    }
}
export {createList, getAllLists, getAList};