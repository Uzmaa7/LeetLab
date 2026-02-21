import Contest from "../models/contest.model.js";
import User from "../models/user.model";
import { fetchLeetCodeSubmissions } from "../utils/leetcode";

const createManualContest = async (req, res) => {
    const { title, problemLinks, duration } = req.body;

    if (!problemLinks || !Array.isArray(problemLinks) || problemLinks.length === 0) {
        return res.status(400).json({ message: "Please provide problem links" });
    }

    // Helper: Link se 'title-slug' nikalne ke liye
    // Example: https://leetcode.com/problems/two-sum/ -> two-sum
    const extractSlug = (link) => {
        const parts = link.split("/").filter(word => word.length > 0);
        return parts[parts.indexOf("problems") + 1];
    }

    const problemData = problemLinks.map((link) => {
        return {
            link: link,
            titleSlug: extractSlug(link),
            title: extractSlug(link).replace(/-/g, ' ') // Temporary title formatting
        }
    })

    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000)

    try {
        const newContest = await Contest.create({
            title,
            createdBy: req.user._id,
            problems: problemData,
            duration,
            startTime,
            endTime,
            status: "active"
        })

        res.status(201).json({
            success: true,
            message: "Contest started! Go to LeetCode and solve.",
            contest: newContest
        });
    } catch (error) {
        console.error("Error creating manual contest:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const endContestResult = async (req, res) => {
    // humein teen cheezein check karni hain:

    // User ne asliyat mein LeetCode par woh problem solve kiya ya nahi?
    // Kya usne contest ke time period ke beech mein solve kiya?
    // Status "Accepted" hai ya nahi?

    try {
        const { contestId } = req.params;
        const userId = req.user._id;

        // 1. Contest dhoondo aur check karo ki kya ye usi user ka hai
        const contest = await Contest.findOne({ _id: contestId, createdBy: userId });
        if (!contest) {
            return res.status(404).json({ message: "Contest not found!" });
        }

        if (contest.status === "completed") {
            return res.status(400).json({ message: "Contest is already ended." });
        }

        // 2. User ka LeetCode username nikalen
        const user = await User.findById(userId);
        if (!user.leetcodeUsername) {
            return res.status(400).json({ message: "Please link your LeetCode username first." });
        }

        // 3. LeetCode se recent  Accepted submissions fetch karein
        const submissions = await fetchLeetCodeSubmissions(user.leetcodeUsername);
        // [
        //   {
        //     "titleSlug": "two-sum",
        //     "timestamp": "1739856900", // Yeh seconds mein hota hai
        //     "title": "Two Sum"
        //   },
        //   {
        //     "titleSlug": "palindrome-number",
        //     "timestamp": "1739850000",
        //     "title": "Palindrome Number"
        //   }
        // ]

        // 4. Verification Logic
        const updatedResults = contest.problems.map((prob) => {
            // Check: Kya is problem ka slug submissions mein hai?
            const matchedSubmission = submissions.find(sub =>
                sub.titleSlug === prob.titleSlug &&
                (new Date(sub.timestamp * 1000) >= contest.startTime) &&
                (new Date(sub.timestamp * 1000) <= contest.endTime)
            )
            return {
                problemLink: prob.link,
                titleSlug: prob.titleSlug,
                isSolved: !!matchedSubmission,
                solvedAt: matchedSubmission ? new Date(matchedSubmission.timestamp * 1000) : null
            }
        })
        // 5. Update Contest in DB
        contest.results = updatedResults;
        contest.status = "completed";
        await contest.save();

        res.status(200).json({
            success: true,
            message: "Contest ended and results synced!",
            results: updatedResults
        });


    } catch (error) {
        console.error("End Contest Error:", error);
        res.status(500).json({ message: "Failed to verify contest results." });
    }


}

const getAllContest = async (req, res) => {

}

const generateWeeklyContest = async (req, res) => {

}



export { createManualContest, endContestResult, getAllContest, generateWeeklyContest };