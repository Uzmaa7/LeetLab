import { body, query , param} from "express-validator";

const uploadQuestionValidator = () => {
    return [
        body("title")
            .trim()
            .notEmpty().withMessage("Title is required")
            .isLength({ min: 2, max: 100 })
            .withMessage("Title cannot exceed 20 characters"),

        body("platform")
            .trim()
            .notEmpty().withMessage("Platform is required")
            .bail()
            .isIn(["leetcode", "gfg", "codeforces", "other"])
            .withMessage("Invalid platform name"),

        body("difficulty")
            .trim()
            .notEmpty()
            .withMessage("Difficulty level is required")
            .isIn(["easy", "medium", "hard"])
            .withMessage("Difficulty must be easy, medium, or hard"),

        body("questionUrl")
            .trim()
            .notEmpty().withMessage("Question URL is required")
            .isURL().withMessage("Please provide a valid URL"),

        body("topics")
            .optional()
            .isArray()// <--- Ye check karega ki array ho []
            .withMessage("Topics must be an array of strings"),

        body("topics.*")
            .trim()
            .isString().withMessage("Each topic must be a string")
            .notEmpty().withMessage("Topic cannot be an empty string")
    ]
}

const getAllQuestionsValidator = () => {
    return [
        query("difficulty")
            .optional()
            .isIn(["easy", "medium", "hard"]),

        query("platform")
            .optional()
            .isIn(["leetcode", "gfg", "codeforces", "other"]),

        query("topic")
            .optional()
            .isString(),

        query("mode")
            .optional()
            .isIn(["any", "all"]),

        query("page")
            .optional()
            .isInt({ min: 1 }),

        query("limit")
            .optional()
            .isInt({ min: 1, max: 50 })
    ]
}

const idValidator = () => {
    return[
        param("questionId")
            .isMongoId()
            .withMessage("Invalid Question ID")
    ]
}

const updateQuestionValidator = () => {
    return[
         body("title")
            .trim()
            .optional()
            .isLength({ min: 2, max: 100 })
            .withMessage("Title cannot exceed 20 characters"),

        body("platform")
            .trim()
            .optional()
            .isIn(["leetcode", "gfg", "codeforces", "other"])
            .withMessage("Invalid platform name"),

        body("difficulty")
            .trim()
            .optional()
            .isIn(["easy", "medium", "hard"])
            .withMessage("Difficulty must be easy, medium, or hard"),
    ]
}

export { uploadQuestionValidator, getAllQuestionsValidator, idValidator, updateQuestionValidator};