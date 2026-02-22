import Contest from "../models/contest.model.js";
import User from "../models/user.model.js";
import { fetchLeetCodeSubmissions } from "../utils/leetcode.js";
import cron from "node-cron";
import { fetchAllSolvedProblems } from "./leetcode.js";



const createManualContest = async (req, res) => {
    try {
        // 1. 
        const user = await User.findById(req.user._id);
        if (!user || !user.leetcodeUsername) {
            return res.status(400).json({
                success: false,
                message: "Please provide leetcode username."
            });
        }


        const { title, problemLinks, duration, questionCount } = req.body;

        // 2. all fields validation
        if (!title || !problemLinks || !duration || !questionCount) {
            return res.status(400).json({ message: "All fields (title, links, duration, count) are required" });
        }


        if (!problemLinks || !Array.isArray(problemLinks) || problemLinks.length === 0) {
            return res.status(400).json({ message: "Please provide problem links" });
        }




        // 3. Question count validation (2 to 4)
        if (questionCount < 2 || questionCount > 4) {
            return res.status(400).json({ message: "You can only choose between 2 to 4 questions." });
        }

        // 4. Links count match
        if (problemLinks.length !== Number(questionCount)) {
            return res.status(400).json({
                message: `Please provide exactly ${questionCount} problem links as selected.`
            });
        }


        // 5. LeetCode link check
        const isLeetcodeLink = (link) => link.includes("leetcode.com/problems/");
        for (const link of problemLinks) {
            if (!isLeetcodeLink(link)) {
                return res.status(400).json({ message: "Only leetcode links are allowed!" });
            }
        }


        // Helper: Link se 'title-slug' nikalne ke liye
        // Example: https://leetcode.com/problems/two-sum/ -> two-sum
        const extractSlug = (link) => {
            const parts = link.split("/").filter(word => word.length > 0);
            const problemIndex = parts.indexOf("problems");
            return problemIndex !== -1 ? parts[problemIndex + 1] : "invalid-link"
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

        // 6. Database Entry
        const newContest = await Contest.create({
            title,
            createdBy: req.user._id,
            problems: problemData,
            duration: Number(duration),
            questionCount: Number(questionCount),
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

    const userId = req.user._id;

    const { page = 1 } = req.query;

    const contest_limit_per_page = 5;

    const skip = (page - 1) * contest_limit_per_page;

    try {

        // . Fetch Data with Pagination

        const [allContest, totalContest] = await Promise.all([
        Contest.find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(contest_limit_per_page)
        .lean(),

        Contest.countDocuments({createdBy: userId})
        ])

        // 4. SMART STATS: Performance Overview
        // Hum check karenge ki user ne total kitne contests "complete" kiye hain
        const completedContestCount = await Contest.countDocuments({ createdBy: userId, status: "completed" });

        res.status(200).json({
            status: true,
            message: "Contests fetched successfully",
            // 1. Pagination Data (Frontend ke pagination buttons ke liye)
            pagination: {
                totalContest,
                currentPage: Number(page),
                totalPages: Math.ceil(totalContest / contest_limit_per_page),
                limit: contest_limit_per_page
            },

            stats: {
                totalCompleted: completedContestCount.length,
            },

            // 3. Actual Data
            allContest
        })
    } catch (error) {
        console.error("getAllContest Error:", error);
        res.status(500).json({ message: "Failed to fetch contests" });
    }
}

const scheduleWeeklyContests = () => {
    // Har Sunday subah 8:00 AM par chalega
    cron.schedule("0 8 * * 0", async () => {
        console.log("Sunday 8 AM: Generating weekly contests for all users...");

        try {
            const users = await User.find({ leetcodeUsername: { $exists: true } });

            for (const user of users) {
                const allProblems = await fetchAllSolvedProblems(user.leetcodeUsername);

                if (allProblems && allProblems.length >= 4) {
                    const shuffled = allProblems.sort(() => 0.5 - Math.random());
                    const selectedProblems = shuffled.slice(0, 4).map(p => ({
                        title: p.title,
                        titleSlug: p.titleSlug,
                        link: `https://leetcode.com/problems/${p.titleSlug}/`,
                        difficulty: "Medium"
                    }));

                    const duration = 60; // 1 hour
                    const startTime = new Date();
                    const endTime = new Date(startTime.getTime() + (duration * 60 * 1000));

                    await Contest.create({
                        title: `Sunday Morning Blast - ${new Date().toLocaleDateString()}`,
                        creator: user._id,
                        problems: selectedProblems,
                        duration,
                        startTime,
                        endTime,
                        status: "active"
                    });
                    console.log(`✅ Contest created for user: ${user.leetcodeUsername}`);
                }
            }
        } catch (error) {
            console.error("Cron Job Error:", error);
        }
    });
};





export { createManualContest, endContestResult, getAllContest, scheduleWeeklyContests };