import {body, param, check, query} from "express-validator";

const sendRequestValidation = () => {
    return [
        body("receiverId")
        .trim()
        .notEmpty().withMessage("Please enter receiverID")
        .isMongoId().withMessage("Invalid format of id")
    ]
}

const acceptRequestValidation = () => {
    return [
        body("requestId")
        .trim()
        .notEmpty().withMessage("Please enter a request ID")
        .isMongoId().withMessage("Invalid Request ID"),


        body("accept")
        .notEmpty().withMessage("Please add Accept")
        .isBoolean().withMessage("Accept must be a boolean")

    ]
}
export {sendRequestValidation, acceptRequestValidation};