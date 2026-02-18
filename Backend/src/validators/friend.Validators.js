import {body, param, check, query} from "express-validator";

const sendRequestValidation = () => {
    return [
        body("receiverId")
        .trim()
        .notEmpty().withMessage("Please enter receiverID")
        .isMongoId().withMessage("Invalid format of id")
    ]
}

export {sendRequestValidation};