export const UserRolesEnum = {
    STUDENT: "student",
    ADMIN: "admin",
}
export const AvailableUserRoles = Object.values(UserRolesEnum);



export const ProblemDifficultyLevel = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
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