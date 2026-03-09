# LeetLab Backend API Documentation

**Version:** 1.0.0  
**Base URL:** `http://localhost:5000/api/v1`  
**Frontend URL:** `http://localhost:5173`

---

## Table of Contents
1. [Authentication Overview](#authentication-overview)
2. [Middleware & Security](#middleware--security)
3. [API Endpoints](#api-endpoints)
   - [Auth Endpoints](#auth-endpoints)
   - [Problem Endpoints](#problem-endpoints)
   - [Submission Endpoints](#submission-endpoints)
   - [Execution Endpoints](#execution-endpoints)
   - [List/Playlist Endpoints](#listplaylist-endpoints)
   - [Contest Endpoints](#contest-endpoints)
   - [Chat Endpoints (TalkTown)](#chat-endpoints-talktown)
   - [Friend Endpoints (TalkTown)](#friend-endpoints-talktown)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Issues & Recommendations](#issues--recommendations)

---

## Authentication Overview

### JWT Tokens
- **Access Token**: Short-lived token (stored in httpOnly cookies)
- **Refresh Token**: Long-lived token for refreshing access (stored in httpOnly cookies)
- **Token Duration**: Access token expires in ~1 hour, Refresh token expires in 7 days

### Authentication Methods
1. **Cookie-based** (primary): Tokens sent via httpOnly cookies
2. **Bearer Token** (fallback): Can send token in `Authorization: Bearer <token>` header

### User Roles
- `ADMIN`: Can create/update/delete problems
- `STUDENT`: Regular user (default role)

---

## Middleware & Security

### Middleware Stack
```
1. express.json() - Parse JSON request bodies
2. express.urlencoded() - Parse URL-encoded data
3. cookieParser() - Parse cookies
4. cors() - CORS enabled for frontend (http://localhost:5173)
```

### Custom Middlewares
- **`verifyJWT`** - Authenticates user via JWT token
- **`checkAdmin`** - Verifies user has ADMIN role
- **`validate`** - Validates request body/params against schema
- **`upload.single/array()`** - Handles file uploads (Multer middleware)

### Validation Validators
- `registrationValidation()` - Validates signup data
- `loginValidation()` - Validates login credentials
- `changePasswordValidation()` - Validates password change
- `createGroupChatValidation()` - Validates group creation
- `addMembersValidation()` - Validates member addition
- `removeMemberValidation()` - Validates member removal
- `chatIdValidation()` - Validates chat ID format
- `sendAttachmentValidation()` - Validates attachment upload
- `renameChatValidation()` - Validates rename data
- `sendRequestValidation()` - Validates friend request
- `acceptRequestValidation()` - Validates request acceptance
- `endContestResultValidation()` - Validates contest result

---

## API Endpoints

### **AUTH ENDPOINTS**

#### 1. Register User
```
POST /auth/register
```
**Auth Required:** No  
**Validation:** `registrationValidation()`

**Request Body:**
```json
{
  "username": "john_doe",
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "securePass123",
  "role": "STUDENT"  // Optional: defaults to STUDENT
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_mongo_id",
    "email": "john@example.com",
    "role": "STUDENT",
    "avatar": "default_avatar_url"
  }
}
```

**Error Responses:**
- `400` - User already exists
- `400` - Something went wrong while registering
- `500` - Error creating user

---

#### 2. Login User
```
POST /auth/login
```
**Auth Required:** No  
**Validation:** `loginValidation()`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Success Response (200):**
```json
{
  "message": "User logged In successfully",
  "user": {
    "_id": "user_mongo_id",
    "username": "john_doe",
    "email": "john@example.com",
    "fullname": "John Doe",
    "role": "STUDENT",
    "avatar": {
      "public_id": "cloudinary_public_id",
      "url": "https://cloudinary_url..."
    }
  },
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

**Error Responses:**
- `401` - User not found
- `401` - Invalid user credentials
- `500` - Error login user

---

#### 3. Logout User
```
POST /auth/logout
```
**Auth Required:** Yes (`verifyJWT`)

**Request Body:** None

**Success Response (200):**
```json
{
  "message": "User logged Out"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error logout user

**Side Effects:** Clears accessToken and refreshToken cookies

---

#### 4. Refresh Access Token
```
POST /auth/refresh-token
```
**Auth Required:** No (but requires refreshToken in cookies)

**Request Body:** None

**Success Response (200):**
```json
{
  "message": "Access token refreshed",
  "tokens": {
    "accessToken": "new_jwt_access_token",
    "refreshToken": "new_jwt_refresh_token"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request (no refresh token)
- `401` - Invalid refresh token
- `401` - Refresh token is expired or used
- `500` - refreshAccessToken error

---

#### 5. Check Auth Status
```
GET /auth/check
```
**Auth Required:** Yes (`verifyJWT`)

**Request Body:** None

**Success Response (200):**
```json
{
  "success": true,
  "message": "User authenticated successfully",
  "user": {
    "_id": "user_mongo_id",
    "username": "john_doe",
    "email": "john@example.com",
    "fullname": "John Doe",
    "role": "STUDENT",
    "avatar": { ... }
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error checking user

---

#### 6. Change Password
```
POST /auth/change-password
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `changePasswordValidation()`

**Request Body:**
```json
{
  "oldPassword": "oldPass123",
  "newPassword": "newSecurePass456",
  "confirmPassword": "newSecurePass456"
}
```

**Success Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

**Error Responses:**
- `404` - User not found
- `400` - New password must be different from old password
- `400` - Mismatch new password and confirm password
- `401` - Invalid old password
- `500` - Error in changing password

**Side Effects:** Clears all sessions (revokes refreshToken)

---

#### 7. Update Avatar
```
PATCH /auth/update-avatar
```
**Auth Required:** Yes (`verifyJWT`)  
**Content-Type:** `multipart/form-data`

**Request:**
- **File**: `avatar` (single image file, multipart)
- **Field Name**: `avatar`

**Success Response (200):**
```json
{
  "message": "Avatar updated successfully",
  "user": {
    "_id": "user_mongo_id",
    "username": "john_doe",
    "email": "john@example.com",
    "fullname": "John Doe",
    "avatar": {
      "public_id": "new_cloudinary_public_id",
      "url": "https://new_cloudinary_url..."
    }
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - Avatar file is missing
- `400` - Only image files are allowed
- `400` - Error while uploading on cloudinary
- `400` - User not found
- `500` - updateAvatar error

**Storage:** Images uploaded to Cloudinary

---

### **PROBLEM ENDPOINTS**

#### 1. Create Problem
```
POST /problems/create-problem
```
**Auth Required:** Yes (`verifyJWT`)  
**Admin Required:** Yes (`checkAdmin`)

**Request Body:**
```json
{
  "title": "Two Sum",
  "description": "Given an array of integers nums...",
  "difficulty": "Easy",
  "tags": ["array", "hash-table"],
  "constraints": "1 <= nums.length <= 10^4",
  "hints": ["Use a hash map"],
  "examples": [
    {
      "input": "[2,7,11,15], 9",
      "output": "[0,1]",
      "explanation": "nums[0] + nums[1] == 9"
    }
  ],
  "testcases": [
    { "input": "2 7 11 15", "output": "0 1" },
    { "input": "3 2 4", "output": "0 2" }
  ],
  "codeSnippets": {
    "javascript": "var twoSum = function(nums, target) {\n  // Code here\n};",
    "python": "def twoSum(nums, target):\n    # Code here\n    pass",
    "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Code here\n    }\n};"
  },
  "referenceSolution": {
    "javascript": "var twoSum = function(nums, target) { return [0,1]; };",
    "python": "def twoSum(nums, target): return [0,1]",
    "cpp": "vector<int> twoSum(vector<int>& nums, int target) { return {0, 1}; }"
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Problem created successfully",
  "problem": {
    "_id": "problem_mongo_id",
    "title": "Two Sum",
    "description": "...",
    "difficulty": "Easy",
    "tags": ["array", "hash-table"],
    "createdBy": "admin_user_id",
    "testcases": [...],
    "__v": 0
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `403` - Only admin can create problems
- `400` - Testcase failed for language X
- `400` - Language X is not supported
- `500` - Error while creating problem

**Validation:** Reference solution is validated against all testcases

---

#### 2. Get All Problems
```
GET /problems/get-All-problems
```
**Auth Required:** Yes (`verifyJWT`)

**Query Params:** None

**Success Response (200):**
```json
{
  "success": true,
  "message": "All the Problems fetched successfully",
  "problems": [
    {
      "_id": "problem_id_1",
      "title": "Two Sum",
      "difficulty": "Easy",
      "tags": ["array", "hash-table"],
      "createdBy": "admin_id",
      "createdAt": "2025-03-09T10:30:00Z"
    },
    { ... }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - No problems found
- `500` - Error while fetching Problems

---

#### 3. Get Problem By ID
```
GET /problems/get-problem/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**URL Params:**
- `id` (string): Problem MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Problem fetched successfully",
  "problem": {
    "_id": "problem_id",
    "title": "Two Sum",
    "description": "Given an array of integers...",
    "difficulty": "Easy",
    "tags": ["array", "hash-table"],
    "constraints": "...",
    "hints": ["Use a hash map"],
    "examples": [...],
    "testcases": [...],
    "codeSnippets": {...},
    "referenceSolution": {...},
    "createdBy": "admin_id"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Problem not found
- `500` - Error while fetching Problem

---

#### 4. Update Problem
```
PUT /problems/update-problem/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**Admin Required:** Yes (`checkAdmin`)  
**URL Params:**
- `id` (string): Problem MongoDB ID

**Request Body:** Same structure as Create Problem (partial update supported)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Problem updated successfully",
  "problem": { ... }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `403` - Only admin can update problems
- `404` - Problem not found
- `400` - Validation errors
- `500` - Error while updating problem

---

#### 5. Delete Problem
```
DELETE /problems/delete-problem/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**Admin Required:** Yes (`checkAdmin`)  
**URL Params:**
- `id` (string): Problem MongoDB ID

**Response (200):**
```json
{
  "success": true,
  "message": "Problem deleted successfully"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `403` - Only admin can delete problems
- `404` - Problem not found
- `500` - Error while deleting problem

---

#### 6. Get User's Solved Problems
```
GET /problems/get-solved-problems
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Solved problems fetched successfully",
  "solvedProblems": [
    {
      "_id": "problemsolved_id",
      "problem": "problem_id",
      "solvedBy": "user_id",
      "solvedAt": "2025-03-09T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error fetching solved problems

---

### **SUBMISSION ENDPOINTS**

#### 1. Get All User Submissions
```
GET /submission/get-all-submissions
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Submissions fetched successfully",
  "submissions": [
    {
      "_id": "submission_id",
      "problem": "problem_id",
      "submitBy": "user_id",
      "sourceCode": "function twoSum(nums) { ... }",
      "language": "javascript",
      "status": "ACCEPTED",
      "stdin": "2 3\n4 5",
      "stdout": "[0,1]",
      "stderr": null,
      "memory": "45 KB",
      "time": "0.05 s",
      "submittedAt": "2025-03-09T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Failed to fetch submissions

---

#### 2. Get Submission for Specific Problem
```
GET /submission/get-submission/:problemId
```
**Auth Required:** Yes (`verifyJWT`)  
**URL Params:**
- `problemId` (string): Problem MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Submissions for a problem fetched successfully",
  "submissions": [...]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Submissions for a problem Failed

---

#### 3. Get Submission Count for Problem
```
GET /submission/get-submissions-counts/:problemId
```
**Auth Required:** Yes (`verifyJWT`)  
**URL Params:**
- `problemId` (string): Problem MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "getAllTheSubmissionsForProblem fetched successfully",
  "count": 42
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - getAllTheSubmissionsForProblem Failed

---

### **EXECUTION ENDPOINTS**

#### 1. Execute Code (Run & Judge)
```
POST /execute-code/
```
**Auth Required:** Yes (`verifyJWT`)

**Request Body:**
```json
{
  "source_code": "function twoSum(nums, target) { return [0,1]; }",
  "language_id": 63,
  "stdin": ["2 7 11 15\n9", "3 2 4\n6"],
  "expected_outputs": ["0 1", "0 2"],
  "problemId": "problem_mongo_id"
}
```

**Note:** `language_id` maps from Judge0 API:
- `63` - JavaScript
- `71` - Python
- `54` - C++

**Success Response (200):**
```json
{
  "success": true,
  "message": "Code executed successfully",
  "submission": {
    "_id": "submission_id",
    "problem": "problem_id",
    "submitBy": "user_id",
    "sourceCode": "...",
    "language": "javascript",
    "status": "ACCEPTED",
    "detailedResults": [
      {
        "testCase": 1,
        "passed": true,
        "stdout": "0 1",
        "expectedOutput": "0 1",
        "stderr": null,
        "status": "Accepted"
      },
      {
        "testCase": 2,
        "passed": true,
        "stdout": "0 2",
        "expectedOutput": "0 2",
        "stderr": null,
        "status": "Accepted"
      }
    ]
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - Invalid or Missing test cases
- `500` - Error executing code

**External Service:** Uses Judge0 API for code execution

---

### **LIST/PLAYLIST ENDPOINTS**

#### 1. Get All User Lists
```
GET /list/
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "All Lists fetched successfully",
  "allLists": [
    {
      "_id": "list_id",
      "title": "Must Solve Array Problems",
      "description": "Array problems from Easy to Medium",
      "createdBy": "user_id",
      "problemsInList": [
        {
          "_id": "problemsInList_id",
          "problem": {
            "_id": "problem_id",
            "title": "Two Sum",
            "difficulty": "Easy"
          }
        }
      ],
      "createdAt": "2025-03-09T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Failed to fetch All Lists

---

#### 2. Get Specific List
```
GET /list/:listId
```
**Auth Required:** Yes (`verifyJWT`)  
**URL Params:**
- `listId` (string): List MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "A list fetched successfully",
  "list": { ... }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - List not found
- `500` - Failed to fetch A List

---

#### 3. Create List/Playlist
```
POST /list/create-playlist
```
**Auth Required:** Yes (`verifyJWT`)

**Request Body:**
```json
{
  "title": "Array Problems",
  "description": "All array-based DSA problems"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "List created Successfully",
  "list": {
    "_id": "list_id",
    "title": "Array Problems",
    "description": "All array-based DSA problems",
    "createdBy": "user_id",
    "problemsInList": [],
    "createdAt": "2025-03-09T10:30:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Failed to create List

---

#### 4. Add Problem(s) to List
```
POST /list/:listId/add-problem
```
**Auth Required:** Yes (`verifyJWT`)  
**URL Params:**
- `listId` (string): List MongoDB ID

**Request Body:**
```json
{
  "problemIds": ["problem_id_1", "problem_id_2", "problem_id_3"]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Problems added to list successfully",
  "problemsInList": [...]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - Invalid or missing problemId
- `500` - Failed to add problems to list

---

#### 5. Remove Problem from List
```
DELETE /list/:listId/remove-problem
```
**Auth Required:** Yes (`verifyJWT`)  
**URL Params:**
- `listId` (string): List MongoDB ID

**Request Body:**
```json
{
  "problemIds": ["problem_id_1", "problem_id_2"]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Problems removed from list successfully"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - Invalid or missing problemId
- `500` - Failed to remove problems

---

#### 6. Delete List
```
DELETE /list/:listId
```
**Auth Required:** Yes (`verifyJWT`)  
**URL Params:**
- `listId` (string): List MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "List deleted successfully"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - List not found
- `500` - Failed to delete list

---

### **CONTEST ENDPOINTS**

#### 1. Create Manual Contest
```
POST /contest/create-manual
```
**Auth Required:** Yes (`verifyJWT`)

**Request Body:**
```json
{
  "title": "Weekly Challenge - March 2025",
  "problemLinks": [
    "https://leetcode.com/problems/two-sum/",
    "https://leetcode.com/problems/reverse-string/",
    "https://leetcode.com/problems/valid-parentheses/"
  ],
  "duration": 120,
  "questionCount": 3
}
```

**Validation Rules:**
- `questionCount`: Must be between 2-4
- `problemLinks`: Array length must equal `questionCount`
- All links must be LeetCode URLs containing "leetcode.com/problems/"

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contest started! Go to LeetCode and solve.",
  "contest": {
    "_id": "contest_id",
    "title": "Weekly Challenge - March 2025",
    "createdBy": "user_id",
    "problems": [
      {
        "link": "https://leetcode.com/problems/two-sum/",
        "titleSlug": "two-sum",
        "title": "two sum",
        "solved": false
      },
      { ... }
    ],
    "duration": 120,
    "questionCount": 3,
    "startTime": "2025-03-09T10:30:00Z",
    "endTime": "2025-03-09T12:30:00Z",
    "status": "active"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - User does not have leetcodeUsername linked
- `400` - All fields required
- `400` - Links count doesn't match questionCount
- `400` - Only leetcode links allowed
- `400` - Invalid question count (must be 2-4)
- `500` - Internal Server Error

**Prerequisite:** User must have `leetcodeUsername` set in their profile

---

#### 2. End Contest & Calculate Results
```
POST /contest/end/:contestId
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `endContestResultValidation()`  
**URL Params:**
- `contestId` (string): Contest MongoDB ID

**Request Body:** None (fetches from LeetCode API)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Contest ended successfully",
  "results": {
    "totalQuestions": 3,
    "solvedCount": 2,
    "score": 66.67,
    "problems": [
      {
        "titleSlug": "two-sum",
        "solved": true,
        "detail": "Solved at 2025-03-09T10:45:00Z"
      },
      {
        "titleSlug": "reverse-string",
        "solved": true,
        "detail": "Solved at 2025-03-09T11:00:00Z"
      },
      {
        "titleSlug": "valid-parentheses",
        "solved": false,
        "detail": "Not solved"
      }
    ]
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Contest not found
- `400` - Contest already ended
- `400` - User must link LeetCode username first
- `500` - Internal Server Error

**Verification Logic:**
- Checks if problems were solved within contest time window
- Validates against LeetCode API
- Marks contest status as "completed"

---

#### 3. Get All User Contests
```
GET /contest/all-contest
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "All contests fetched successfully",
  "contests": [
    {
      "_id": "contest_id",
      "title": "Weekly Challenge",
      "status": "active|completed",
      "startTime": "2025-03-09T10:30:00Z",
      "endTime": "2025-03-09T12:30:00Z",
      "questionCount": 3,
      "problems": [...]
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Failed to fetch contests

---

#### 4. Generate Weekly Random Contest
```
POST /contest/generate-weekly
```
**Auth Required:** Yes (`verifyJWT`)

**Request Body:** None

**Success Response (201):**
```json
{
  "success": true,
  "message": "Weekly contest generated successfully",
  "contest": {
    "_id": "contest_id",
    "title": "Weekly Random Contest",
    "problems": [4 random problems],
    "status": "active"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Failed to generate weekly contest

**Note:** Selects 4 random problems from the database

---

### **CHAT ENDPOINTS (TalkTown)**

#### 1. Create Group Chat
```
POST /chat/create-group
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `createGroupChatValidation()`

**Request Body:**
```json
{
  "name": "DSA Study Group",
  "members": ["user_id_1", "user_id_2", "user_id_3"]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Group created successfully",
  "data": {
    "_id": "chat_id",
    "name": "DSA Study Group",
    "groupChat": true,
    "createdBy": "current_user_id",
    "members": ["current_user_id", "user_id_1", "user_id_2", "user_id_3"],
    "createdAt": "2025-03-09T10:30:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - Validation failed
- `500` - Internal server error while creating group

---

#### 2. Get All User Chats
```
GET /chat/my-chats
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "message": "Chats fetched successfully",
  "chats": [
    {
      "_id": "chat_id",
      "name": "John Doe",  // For 1-on-1, shows other person's name
      "groupChat": false,
      "members": ["friend_user_id"]
    },
    {
      "_id": "group_chat_id",
      "name": "DSA Study Group",
      "groupChat": true,
      "members": ["user_id_1", "user_id_2", "user_id_3"]
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error while fetching all the Chats

---

#### 3. Get User's Groups
```
GET /chat/my-groups
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Groups fetched succesfully",
  "groups": [
    {
      "_id": "group_chat_id",
      "name": "DSA Study Group",
      "members": [
        {
          "_id": "user_id_1",
          "fullname": "John Doe"
        },
        {
          "_id": "user_id_2",
          "fullname": "Jane Smith"
        }
      ],
      "groupChat": true
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error while fetching all the groups

---

#### 4. Add Members to Group
```
PUT /chat/add-members
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `addMembersValidation()`

**Request Body:**
```json
{
  "chatId": "group_chat_id",
  "members": ["new_user_id_1", "new_user_id_2"]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Members added successfully",
  "chat": {
    "_id": "group_chat_id",
    "name": "DSA Study Group",
    "members": [..., "new_user_id_1", "new_user_id_2"]
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Chat not found
- `403` - Only admin can add members
- `400` - Members already added
- `500` - Error adding members

**Authorization:** Only group creator can add members

---

#### 5. Remove Member from Group
```
DELETE /chat/remove-member
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `removeMemberValidation()`

**Request Body:**
```json
{
  "chatId": "group_chat_id",
  "memberId": "user_id_to_remove"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Chat not found
- `403` - Only admin can remove members
- `500` - Error removing member

---

#### 6. Exit Group
```
DELETE /chat/exit-group/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `chatIdValidation()`  
**URL Params:**
- `id` (string): Chat MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Exited group successfully"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Chat not found
- `500` - Error exiting group

---

#### 7. Send Attachment/Message
```
POST /chat/send-attachment
```
**Auth Required:** Yes (`verifyJWT`)  
**Content-Type:** `multipart/form-data`  
**Validation:** `sendAttachmentValidation()`

**Request:**
- **Files**: `files` (up to 5 files)
- **Body Fields**:
  ```json
  {
    "chatId": "chat_id",
    "description": "Check out this solution"
  }
  ```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "message": {
    "_id": "message_id",
    "chat": "chat_id",
    "sender": "user_id",
    "attachments": [
      {
        "public_id": "cloudinary_id",
        "url": "https://cloudinary_url",
        "type": "image|document|code"
      }
    ],
    "description": "Check out this solution",
    "createdAt": "2025-03-09T10:30:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - Invalid chat or description
- `400` - File upload failed
- `500` - Error sending message

**Limits:** Max 5 files per message

---

#### 8. Get Chat Messages
```
GET /chat/message/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `chatIdValidation()`  
**URL Params:**
- `id` (string): Chat MongoDB ID

**Query Params:**
- `page` (optional): Pagination page number
- `limit` (optional): Messages per page

**Success Response (200):**
```json
{
  "success": true,
  "message": "Messages fetched successfully",
  "messages": [
    {
      "_id": "message_id",
      "chat": "chat_id",
      "sender": {
        "_id": "user_id",
        "fullname": "John Doe"
      },
      "content": "Hello everyone!",
      "attachments": [],
      "createdAt": "2025-03-09T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Chat not found
- `500` - Error fetching messages

---

#### 9. Get Chat Details
```
GET /chat/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `chatIdValidation()`  
**URL Params:**
- `id` (string): Chat MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Chat details fetched successfully",
  "chat": {
    "_id": "chat_id",
    "name": "DSA Study Group",
    "groupChat": true,
    "createdBy": "admin_user_id",
    "members": [...],
    "createdAt": "2025-03-09T10:30:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Chat not found
- `500` - Error fetching chat details

---

#### 10. Rename Chat
```
PUT /chat/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `renameChatValidation()`  
**URL Params:**
- `id` (string): Chat MongoDB ID

**Request Body:**
```json
{
  "name": "New Group Name"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Chat renamed successfully",
  "chat": {
    "_id": "chat_id",
    "name": "New Group Name"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `403` - Only admin can rename
- `404` - Chat not found
- `500` - Error renaming chat

---

#### 11. Delete Chat
```
DELETE /chat/:id
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `chatIdValidation()`  
**URL Params:**
- `id` (string): Chat MongoDB ID

**Success Response (200):**
```json
{
  "success": true,
  "message": "Chat deleted successfully"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Chat not found
- `500` - Error deleting chat

---

### **FRIEND ENDPOINTS (TalkTown)**

#### 1. Search Users
```
GET /friend/search
```
**Auth Required:** Yes (`verifyJWT`)

**Query Params:**
- `fullname` (string): Name to search for

**Success Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "_id": "user_id",
      "fullname": "John Doe",
      "avatar": "https://avatar_url"
    },
    {
      "_id": "user_id_2",
      "fullname": "John Smith",
      "avatar": "https://avatar_url"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error searching users

**Note:** Excludes already-friends and the current user

---

#### 2. Send Friend Request
```
PUT /friend/send-request
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `sendRequestValidation()`

**Request Body:**
```json
{
  "receiverId": "target_user_id"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "request sent successfully",
  "request": {
    "_id": "request_id",
    "sender": "current_user_id",
    "receiver": "target_user_id",
    "createdAt": "2025-03-09T10:30:00Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized request
- `400` - Request already sent
- `500` - Error sending request

**Duplicate Prevention:** Checks both directions to avoid duplicate requests

---

#### 3. Accept/Reject Friend Request
```
PUT /friend/accept-request
```
**Auth Required:** Yes (`verifyJWT`)  
**Validation:** `acceptRequestValidation()`

**Request Body:**
```json
{
  "requestId": "request_id",
  "accept": true
}
```

**Success Response (200):**
- If `accept: true`:
```json
{
  "success": true,
  "message": "Friend added successfully",
  "chat": {
    "_id": "new_chat_id",
    "name": "Sender Name-Receiver Name",
    "members": ["sender_id", "receiver_id"],
    "groupChat": false
  }
}
```

- If `accept: false`:
```json
{
  "success": true,
  "message": "request rejected"
}
```

**Error Responses:**
- `401` - Unauthorized request
- `404` - Request not found
- `401` - You are not authorized to accept this request
- `500` - Error processing request

**Side Effects:** 
- On accept: Creates a 1-on-1 chat between both users
- Deletes the friend request

---

#### 4. Get Friend Requests (Notifications)
```
GET /friend/notification
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Notifications fetched successfully",
  "requests": [
    {
      "_id": "request_id",
      "sender": {
        "_id": "sender_id",
        "fullname": "John Doe",
        "avatar": "https://avatar_url"
      },
      "receiver": "current_user_id",
      "createdAt": "2025-03-09T10:30:00Z"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error fetching notifications

---

#### 5. Get User's Friends
```
GET /friend/my-friends
```
**Auth Required:** Yes (`verifyJWT`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Friends fetched successfully",
  "friends": [
    {
      "_id": "friend_id",
      "fullname": "John Doe",
      "avatar": "https://avatar_url",
      "email": "john@example.com"
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized request
- `500` - Error fetching friends

---

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  username: String (3-20 chars, lowercase, unique),
  email: String (unique, lowercase),
  password: String (8+ chars, hashed),
  fullname: String (3+ chars),
  role: String (ADMIN | STUDENT),
  avatar: {
    public_id: String (Cloudinary),
    url: String (image URL)
  },
  isVerified: Boolean,
  refreshToken: String (JWT),
  createdAt: Date,
  updatedAt: Date
}
```

### Problem Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  difficulty: String (Easy|Medium|Hard),
  tags: [String],
  constraints: String,
  hints: [String],
  examples: [{ input, output, explanation }],
  testcases: [{ input, output }],
  codeSnippets: { javascript, python, cpp },
  referenceSolution: { javascript, python, cpp },
  createdBy: ObjectId (User ID),
  createdAt: Date
}
```

### Submission Model
```javascript
{
  _id: ObjectId,
  submitBy: ObjectId (User ID),
  problem: ObjectId (Problem ID),
  sourceCode: String,
  language: String (javascript|python|cpp),
  status: String (ACCEPTED|WRONG_ANSWER|TIME_LIMIT|RUNTIME_ERROR),
  stdin: String,
  stdout: String (JSON),
  stderr: String (JSON),
  memory: String (JSON),
  time: String (JSON),
  submittedAt: Date
}
```

### Chat Model
```javascript
{
  _id: ObjectId,
  name: String,
  groupChat: Boolean,
  createdBy: ObjectId (User ID),
  members: [ObjectId] (User IDs),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  _id: ObjectId,
  chat: ObjectId (Chat ID),
  sender: ObjectId (User ID),
  content: String,
  attachments: [{
    public_id: String,
    url: String,
    type: String
  }],
  createdAt: Date
}
```

### List Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  createdBy: ObjectId (User ID),
  problemsInList: [ObjectId],
  createdAt: Date
}
```

### Contest Model
```javascript
{
  _id: ObjectId,
  title: String,
  createdBy: ObjectId (User ID),
  problems: [{
    link: String (LeetCode URL),
    titleSlug: String,
    title: String,
    solved: Boolean
  }],
  duration: Number (minutes),
  questionCount: Number,
  startTime: Date,
  endTime: Date,
  status: String (active|completed),
  createdAt: Date
}
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "message": "Error description",
  "success": false,
  "error": "Optional detailed error"
}
```

### HTTP Status Codes Used
- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `400` - Bad Request (validation errors, invalid data)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions/role)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error (server-side error)

### Common Error Messages
- **"Unauthorized request"** → No token provided
- **"Invalid access token"** → Token validation failed
- **"Unauthorized request"** → Token expired
- **"Only admin can..."** → User role doesn't have permission
- **"User not found"** → User doesn't exist
- **"Invalid user credentials"** → Wrong password/email

---

## Issues & Recommendations

### 🔴 Critical Issues

#### 1. **Missing Error Handling in Chat Controller**
**Location:** `/chat/send-attachment` endpoint  
**Issue:** The endpoint uses `sendAttachmentValidation` without calling `validate` middleware  
**Recommendation:**
```javascript
// Current
chatRouter.post("/send-attachment", verifyJWT, sendAttachmentValidation, validate, upload.array("files", 5), sendAttachment);

// Should be
chatRouter.post("/send-attachment", verifyJWT, sendAttachmentValidation(), validate, upload.array("files", 5), sendAttachment);
// Note: sendAttachmentValidation() should return a middleware function
```

#### 2. **Missing Semicolon in Routes**
**Location:** [problem.routes.js](problem.routes.js#L6)  
**Issue:** Last route is missing semicolon  
**Recommendation:** Add semicolon:
```javascript
problemRouter.get("/get-solved-problems", verifyJWT, getAllProblemsSolvedByUser);
```

#### 3. **Authentication Not Checked for Contest with LeetCode**
**Location:** Contest controller - `endContestResult`  
**Issue:** Function `fetchLeetCodeSubmissions` is commented out, endpoint will fail  
**Recommendation:** Implement the LeetCode API integration:
```javascript
import { fetchLeetCodeSubmissions } from "../utils/leetcode.js";
// Uncomment and test thoroughly
```

#### 4. **No Duplicate Problem Prevention in Lists**
**Location:** List controller - `addProblemInList`  
**Issue:** Can add same problem multiple times to a list  
**Recommendation:**
```javascript
const existingProblems = await ProblemsInList.find({
  list: listId,
  problem: { $in: problemIds }
});
const newProblemIds = problemIds.filter(id => 
  !existingProblems.some(p => p.problem.toString() === id)
);
```

### 🟠 Medium Priority Issues

#### 5. **Inconsistent Response Structures**
**Issue:** Some endpoints return `success: true`, others don't  
**Recommendation:** Standardize all responses:
```javascript
// Always include success field
{
  success: true|false,
  message: "...",
  data: {...}  // Use 'data' for main response payload
}
```

#### 6. **Missing Rate Limiting**
**Issue:** No rate limiting on critical endpoints (register, login, execute code)  
**Recommendation:** Implement using `express-rate-limit`:
```javascript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per window
});

authRouter.post("/login", loginLimiter, loginValidation(), validate, loginUser);
```

#### 7. **No Input Sanitization**
**Issue:** User inputs not sanitized against injection attacks  
**Recommendation:** Add `express-validator` sanitization:
```javascript
import { body, validationResult } from 'express-validator';

const registrationValidation = () => [
  body('email').isEmail().normalizeEmail(),
  body('username').trim().toLowerCase().escape(),
  body('fullname').trim().escape(),
];
```

#### 8. **Missing Pagination in Large Queries**
**Issue:** `getAllProblems` and `getMyChats` return all records  
**Recommendation:** Add pagination:
```javascript
const page = req.query.page || 1;
const limit = req.query.limit || 10;
const skip = (page - 1) * limit;

const problems = await Problem.find()
  .skip(skip)
  .limit(limit);
```

### 🟡 Low Priority Issues

#### 9. **Inconsistent API Naming Conventions**
- Some use kebab-case: `/get-all-problems`
- Some use snake_case: `/get_submission`  
- Some use camelCase: `/createProblem`  
**Recommendation:** Standardize to kebab-case for all routes

#### 10. **Missing API Documentation Headers**
**Issue:** No `@deprecated`, `@since`, `@changelog` markers  
**Recommendation:** Add JSDoc comments to all controllers

#### 11. **No Logging/Monitoring**
**Issue:** Missing request/response logging  
**Recommendation:** Implement Morgan logger:
```javascript
import morgan from 'morgan';
app.use(morgan('combined'));
```

#### 12. **Incomplete Friend System**
**Issue:** No "accept" status checking before blocking/unfriending  
**Recommendation:** Add friendship status model with states: `PENDING|ACCEPTED|BLOCKED`

#### 13. **Contest Features Incomplete**
- Missing: Update contest details
- Missing: Get specific contest details
- Missing: Leaderboard endpoint
**Recommendation:** Add endpoints:
```
PUT /contest/:id - Update contest
GET /contest/:id - Get contest details  
GET /contest/:id/leaderboard - Get results
```

#### 14. **No Data Validation for Problem Test Cases**
**Issue:** Test cases not validated for format consistency  
**Recommendation:** Add validation in problem creation

#### 15. **Missing Soft Delete Implementation**
**Issue:** Hard deletes for problems (might break submissions references)  
**Recommendation:** Implement soft delete with `isDeleted` flag

---

## Deployment Checklist

### Before Production:
- [ ] Set `secure: true` in all cookie options (HTTPS required)
- [ ] Change CORS origin from `localhost:5173` to actual frontend domain
- [ ] Implement rate limiting on all auth endpoints
- [ ] Add input sanitization and validation
- [ ] Set up proper error logging (e.g., Sentry)
- [ ] Add request logging (Morgan)
- [ ] Implement data backup strategy
- [ ] Set up monitoring and alerting
- [ ] Configure environment variables properly
- [ ] Add request ID tracking for debugging
- [ ] Implement comprehensive API versioning strategy
- [ ] Add API documentation (Swagger/OpenAPI)

---

## Quick Start for Frontend Developers

### 1. Authentication Flow
```javascript
// Register
POST /auth/register → Get user + tokens

// Login  
POST /auth/login → Get user + accessToken + refreshToken

// Check Auth Status
GET /auth/check → Returns current user

// Logout
POST /auth/logout → Clears tokens
```

### 2. Problem Solving Flow
```javascript
// Get problems
GET /problems/get-All-problems

// Get specific problem
GET /problems/get-problem/:id

// Execute code
POST /execute-code

// View submissions
GET /submission/get-all-submissions
GET /submission/get-submission/:problemId
```

### 3. Social Features Flow
```javascript
// Search user
GET /friend/search?fullname=john

// Send friend request
PUT /friend/send-request

// Accept request
PUT /friend/accept-request

// Get notifications
GET /friend/notification

// Start chatting
POST /chat/create-group or use 1-on-1 chat
```

---

## Environment Variables Required

```env
# Database
MONGODB_URI=mongodb://localhost:27017/leetlab

# JWT
ACCESS_TOKEN_SECRET=your_access_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret_key

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Judge0 (for code execution)
JUDGE0_API_HOST=your_judge0_host
JUDGE0_API_KEY=your_judge0_key

# LeetCode (for contest verification)
LEETCODE_API_ENDPOINT=https://leetcode.com/graphql

# Frontend
FRONTEND_URL=http://localhost:5173

# Server
PORT=5000
```

---

## Next Steps

1. **Fix Critical Issues**: Items marked as 🔴
2. **Add Missing Endpoints**: Contest details, leaderboard
3. **Implement Rate Limiting**: Protect against abuse
4. **Add Swagger/OpenAPI**: Auto-generate interactive docs
5. **Add Unit Tests**: Increase code coverage
6. **Performance Optimization**: Add caching, database indexing
7. **Security Audit**: Run OWASP ZAP scan

---

**Last Updated:** March 9, 2025  
**Status:** Production Ready (with recommended fixes)
