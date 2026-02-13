import { body } from "express-validator";




const registrationValidation =  () => {
    return [
        body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),

        body("username")
        .trim()
        .notEmpty().withMessage("username is required")
        .isLength({min:3}).withMessage("username must be atleast 3 characters long")
        .isLength({max:20}).withMessage("username can be atmost 20 characters long"),

        body("fullname")
        .trim()
        .notEmpty().withMessage("fullname is required"),


        body("password")
        .trim()
        .notEmpty().withMessage("please set your password")
        .isLength({min:8}).withMessage("password must be atleast 8 characters long"),
    ]
}


const loginValidation = () => {
    return [
        body("email")
        .trim()
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("Invalid email"),

        body("password")
        .trim()
        .notEmpty().withMessage("password is required")
    ]
}

const changePasswordValidation = () => {
    return[
        body("oldPassword")
        .trim()
        .notEmpty().withMessage("this field is required")
        .isLength({min:8}).withMessage("password must be atleast 8 characters long"),

        body("newPassword")
        .trim()
        .notEmpty().withMessage("this field is required")
        .isLength({min:8}).withMessage("password must be atleast 8 characters long"),

        body("confirmPassword")
        .trim()
        .notEmpty().withMessage("this field is required")
        .isLength({min:8}).withMessage("password must be atleast 8 characters long"),

    ]
}




export {registrationValidation, loginValidation, changePasswordValidation};