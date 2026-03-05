import { isValidObjectId } from "mongoose";
import Question from "../models/question.model.js";
import { uploadQuestionService } from "../services/question.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CollectionQuestion from "../models/collectionQuestion.model.js";
import Collection from "../models/collection.model.js";



const uploadQuestion = asyncHandler(async(req, res) => {

    const {title, platform, difficulty, questionUrl, topics} = req.body;

    const userId = req.user._id;

    //validations

    const question = await uploadQuestionService(userId, title, 
    platform, difficulty, questionUrl, topics);

    return res
    .status(201)
    .json(new ApiResponse(201, "Question added successfully", question));

})

const getAllQuestions = asyncHandler(async(req, res) => {

    let { difficulty, topic, platform, mode, search, page = 1, limit = 20 } = req.query;


    const pageNum = Number(page) || 1;
    const limitNum  = Math.min(Number(limit) || 20, 50);
    const skip = (pageNum - 1) * limitNum;

    const conditions = [
        {addedBy : req.user._id},
        {isDeleted : false}
    ]

    if(search && search.trim() !== ""){
        conditions.push({$text : {$search: search}})
    }

    if(difficulty && difficulty.trim() !== ""){
        conditions.push({difficulty: difficulty.trim().toLowerCase()})
    }

    if(platform && platform.trim() !== ""){
        conditions.push({platform: platform.trim()})
    }

    //?topic=Array,String,Recursion
    if(topic && topic.trim() !== ""){
        const topicArray = topic.split(",")
        .map((t) => t.trim().toLowerCase())

        const searchMode = mode.toLowerCase() === "any" ? "$in" : "$all"

        conditions.push({topics : {[searchMode] : topicArray}})
    }

    const filter = {$and : conditions};

    const [questions, total] = await Promise.all([
        Question.find(filter)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limitNum),

        Question.countDocuments(filter)
    ])

    return res.status(200).json(new ApiResponse(200, {
        total,
        page: pageNum,
        pages: Math.ceil(total/limitNum),
        limit: limitNum,
        questions,
    } ,"Questions fetched"))

})


const getQuestionById = asyncHandler(async(req, res) => {

    const {questionId} = req.params;

    const userId = req.user._id;

    const question = await Question.findOne({
        _id : questionId,
        addedBy : userId,
        isDeleted : false
    })

    if (!question) {
        throw new ApiError(404, "Question not found");
    }

    return res.status(200).json(new ApiResponse(200, question, "Question fetched"))

})


const deleteQuestion = asyncHandler(async (req, res) => {
    const {questionId} = req.params

    if(!isValidObjectId(questionId)){
        throw new ApiError(400, "Invalid question ID");
    }

    const question = await Question.findOneAndUpdate(
        {
            _id : questionId,
            addedBy : req.user._id,
            isDeleted : false
        },
        {
            $set : {
                isDeleted : true
            }
        },
        {
            new: true
        }
    )

    if (!question) {
        throw new ApiError(404, "Question not found");
    }

    // 2. Find all collection links and decrease the count
    const links = await CollectionQuestion.find({ questionId }).select(
        "collectionId"
    );

    if (links.length > 0) {
        const collectionIds = links.map((l) => l.collectionId);

        // 3. Remove all links
        await CollectionQuestion.deleteMany({ questionId });

        // 4. Decrease questionsCount safely
        await Collection.updateMany(
        { _id: { $in: collectionIds }, questionsCount: { $gt: 0 } },
        { $inc: { questionsCount: -1 } }
        );
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Question removed"));
})


const updateQuestion = asyncHandler(async (req, res) => {
    const {questionId} = req.params

    const {title, difficulty, platform} = req.body

    if(!isValidObjectId(questionId)){
         throw new ApiError(400, "Invalid question ID");
    }

    if(!title && !difficulty && !platform){
        throw new ApiError(400, 'At least one field is required')
    }

    const update = {};

    if (title && title.trim() !== '') update.title = title.trim();
    if (difficulty) update.difficulty = difficulty.toLowerCase();
    if (platform) update.platform = platform.toLowerCase();


    const question = await Question.findOneAndUpdate(
        {
            _id : questionId,
            addedBy : req.user._id,
            isDeleted: false,
        },
        {
            $set : update
        },
        {
            new : true,
            runValidators : true
        }
    )

    if (!question) {
        throw new ApiError(404, "Question not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, question, "Question updated" ));
})


export {uploadQuestion, getAllQuestions, getQuestionById, deleteQuestion, updateQuestion};


