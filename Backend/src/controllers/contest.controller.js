

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

}

const getAllContest = async (req, res) => {

}

const generateWeeklyContest = async (req, res) => {

}



export { createManualContest, endContestResult, getAllContest, generateWeeklyContest };