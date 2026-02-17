import { validationResult } from "express-validator";

// "I use validationResult as an extractor function provided by express-validator. 
// Its purpose is to gather all the validation errors that were previously attached to the Request object 
// by the validation middleware (like body or param)."

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next()
    }

    const extractedError = [];//we create new array just for make errors clean-> [err path : err msg]
    errors.array().map((err) => extractedError.push({
        [err.path]: err.msg
    }));

    return res.status(422).json({
        success:false,
        message: "recieved data is not valid",
        extractedError,
    })
}