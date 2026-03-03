import { uploadQuestionService } from "../services/question.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export {uploadQuestion};