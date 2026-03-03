import {body} from "express-validator";

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
        .isIn(["Leetcode", "GFG", "Codeforces", "Other"])
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

export { uploadQuestionValidator };