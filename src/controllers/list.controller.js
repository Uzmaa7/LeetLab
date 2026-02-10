import List from "../models/list.model";
import ProblemsInList from "../models/problemsInList.model";

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

const addProblemInList = async (req, res)=> {
    const {listId} = req.params;//list in which user wants to add the problems
    const {problemIds} = req.body;// [id1, id2] -> all the problems user wants to add in list
    
    try {
        if(!Array.isArray(problemIds) || problemIds.length === 0){
            res.status(400).json({ 
                message: "Invalid or missing problemId" 
            });
        }   
        // 2. prepare the data to insert in problemInListSchema
        const dataToInsert = problemIds.map((problemId) => ({
            list: listId,
            problem: problemId,
        }));

        // 3. we got the documents of problemInListSchema
        const ProblemsInListDocs = await ProblemsInList.insertMany(dataToInsert, { ordered: false });

        // 4. get these document ids
        const insertIds = ProblemsInListDocs.map(doc => doc._id);

        // 5.insert these ids into listSchema -> problemInList field = [doc_id1, doc_id2];
        await List.findByIdAndUpdate(listId, {
            $push: {problemsInList: {$each: insertIds}}
        });

        res.status(201).json({
            success: true,
            message: "Problems added to playlist successfully",
        });
        
    } catch (error) {
        console.error("addProblemInList Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add problems to playlist" 
        });
    }
}
export {createList, getAllLists, getAList, addProblemInList};