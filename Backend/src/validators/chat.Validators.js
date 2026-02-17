import {body} from "express-validator";

const createGroupChatValidation = () => {
    return [
        body("name")
        .trim()
        .notEmpty().withMessage("Please enter group name")
        .isLength({min:1, max:20}).withMessage("name must be atleast a character"),

        body("members")
        .notEmpty().withMessage("Please add members")
        .isArray({min: 2}).withMessage("Members must be an array with 3 people")
    ]
}

export {createGroupChatValidation};