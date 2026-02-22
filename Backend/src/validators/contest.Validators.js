import {body} from "express-validator";

// const createManualContestValidation = () => {
//     retuirn [

//     ]
// }

const endContestResultValidation = () => {
    return [
        param("contestId")
            .notEmpty().withMessage("Contest ID is required")
            .isMongoId().withMessage("Invalid Contest ID format"),
    ];
};

export {endContestResultValidation};