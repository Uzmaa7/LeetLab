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

