import {body, param, check, query} from "express-validator";

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


const addMembersValidation = () => {
    return [
        body("chatId")
        .notEmpty().withMessage("please provide tha Chat ID"),

        body("members")
        .notEmpty().withMessage("please enter members")
        .isArray({min : 2}).withMessage("members must be an array")
    ]
}

const removeMemberValidation = () => {
    return [
        body("chatId")
        .notEmpty().withMessage("please provide tha Chat ID")
        .isMongoId().withMessage("Invalid chatId format"),

        body("userRemoveId")
        .notEmpty().withMessage("Please provide a userId to remove a user")
        .isMongoId().withMessage("Invalid userId format")

    ]
}

const sendAttachmentValidation = () => {
    return [
         body("chatId")
        .notEmpty().withMessage("please provide tha Chat ID")
        .isMongoId().withMessage("Invalid chatId format"),

        check("files")
        .notEmpty().withMessage("Please provide attachment")
        .isArray({min:1, max: 5}).withMessage("attachment must be an array of 1-5 ")
    ]
}

const chatIdValidation = () => {
    return [
        param("id")
        .notEmpty().withMessage("please provide tha Chat ID")
        .isMongoId().withMessage("Invalid chatId format"),
    ]
}

const renameChatValidation = () => {
    return [
        param("id")
        .notEmpty().withMessage("please provide tha Chat ID")
        .isMongoId().withMessage("Invalid chatId format"),

        body("name")
        .notEmpty().withMessage("Please enter a name")
        .isString().withMessage("Invalid name format")
        .isLength({min:1, max:20}).withMessage("Name must be between 1 and 20 characters")

    ]
}

export {createGroupChatValidation, addMembersValidation, removeMemberValidation,
      sendAttachmentValidation,chatIdValidation, renameChatValidation };