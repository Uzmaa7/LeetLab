export const UserRolesEnum = {
    STUDENT: "student",
    ADMIN: "admin",
}
export const AvailableUserRoles = Object.values(UserRolesEnum);



export const ProblemDifficultyLevel = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard"
}
export const AvailableProblemDifficultyLevel = Object.values(ProblemDifficultyLevel);



export const SubmissionStatus = {
    ACCEPTED:"Accepted",
    WRONG_ANSWER:"Wrong Answer",
    TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
    COMPILATION_ERROR: "Compilation Error",
    RUNTIME_ERROR: "Runtime Error (SIGSEGV)",
    INTERNAL_ERROR: "Internal Error",
    PROCESSING: "Processing",
}
export const AvailableSubmissionStatus = Object.values(SubmissionStatus);


export const DB_NAME = "LeetLab";


// ======= events =============================

// Aise likhne se import karna aur use karna aur asaan ho jayega
export const Events = {
    ALERT: "ALERT",
    REFETCH_CHATS: "REFETCH_CHATS",
    NEW_ATTACHMENT: "NEW_ATTACHMENT",
    NEW_MESSAGE_ALERT: "NEW_MESSAGE_ALERT",
    NEW_REQUEST: "NEW_REQUEST",
    NEW_MESSAGE: "NEW_MESSAGE",
};

// Agar aapko list chahiye ho validation ke liye
export const AvailableEvents = Object.values(Events);