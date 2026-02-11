import Submission from "../models/submission.model.js";

//user ke kiye huy sbhi submissions 
const getAllSubmission = async (req, res) => {
    try {
        const userId = req.user._id;

        const submissions = await Submission.find({submitBy : userId});

        // console.log("------------",submissions);

        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions
        })
    } catch (error) {
        console.log("getAllSubmission",error);
        res.status(500).json({
            message: "Failed to fetch submissions",
        })
    }
}
// user k problem A k sbhi submissions 
const getSubmissionForProblem = async (req, res) => {
    try {
        const userId = req.user._id;
    
        const problemId = req.params.problemId;
    
        const submissions = await Submission.find({
            submitBy: userId,
            problem: problemId,
        })
        // console.log("++++++++++" ,submissions);
        res.status(200).json({
                success: true,
                message: "Submissions for a problem fetched successfully",
                submissions
        })
    } catch (error) {
        console.log("getSubmissionForProblem", error);
        res.status(500).json({
        message: "Submissions for a problem Failed",
        })
    }
}

//problem A ki submission details
const getAllTheSubmissionsForProblem = async (req, res) => {
    try {
        const problemId = req.params.problemId;
        const count = await Submission.countDocuments({
            problem: problemId 
        });
        // console.log(">>>>>>>>>>>>>>>>", count);
        res.status(200).json({
                success: true,
                message: "getAllTheSubmissionsForProblem fetched successfully",
                count
        })
    } catch (error) {
        console.log("getAllTheSubmissionsForProblem", error);
        res.status(500).json({
        message: "getAllTheSubmissionsForProblem Failed",
        })
    }
}


export {getAllSubmission , getSubmissionForProblem, getAllTheSubmissionsForProblem};