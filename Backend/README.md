# LeetLab Backend - Production API

Welcome to the LeetLab Backend documentation. This is a feature-rich competitive programming platform with real-time chat, problem management, and contest features.

## 📋 Quick Start

### Installation

```bash
cd Backend
npm install
```

### Environment Setup

Create a `.env` file in the Backend directory:

```env
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/leetlab

# JWT Tokens
ACCESS_TOKEN_SECRET=your_secure_access_secret_min_32_chars
REFRESH_TOKEN_SECRET=your_secure_refresh_secret_min_32_chars
JWT_SECRET=your_jwt_secret

# Cloudinary (Image/File Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Judge0 API (Code Execution)
JUDGE0_API_HOST=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_judge0_api_key

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# LeetCode Integration
LEETCODE_API_ENDPOINT=https://leetcode.com/graphql
```

### Running the Server

```bash
npm run dev      # Development mode (with nodemon)
npm start        # Production mode
npm run build    # Build for production
```

Server runs on `http://localhost:5000`

---

## 📚 API Documentation

Complete API documentation is available in **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

### Quick Links to Documentation Sections:

| Section | Coverage |
|---------|----------|
| **Authentication** | Register, Login, Logout, Token Refresh, Change Password, Avatar Upload |
| **Problems** | Create, Read, Update, Delete problems (Admin only) |
| **Code Execution** | Execute user code against test cases using Judge0 |
| **Submissions** | View user submissions and results |
| **Lists/Playlists** | Organize problems into custom lists |
| **Contests** | Create manual contests, end contests, calculate results |
| **Chat (TalkTown)** | Group chats, 1-on-1 messaging, file sharing |
| **Friends (TalkTown)** | Search users, send requests, manage friendships |

---

## 🏗️ Project Structure

```
Backend/
├── src/
│   ├── app.js                    # Express app setup
│   ├── controllers/              # Business logic
│   │   ├── auth.controller.js
│   │   ├── problem.controller.js
│   │   ├── submission.controller.js
│   │   ├── executeCode.controller.js
│   │   ├── list.controller.js
│   │   ├── contest.controller.js
│   │   ├── chat.controller.js
│   │   └── friend.controller.js
│   │
│   ├── routes/                   # API route definitions
│   │   ├── auth.routes.js
│   │   ├── problem.routes.js
│   │   ├── submission.routes.js
│   │   ├── executeCode.routes.js
│   │   ├── list.routes.js
│   │   ├── contest.routes.js
│   │   ├── chat.routes.js
│   │   └── friend.routes.js
│   │
│   ├── models/                   # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── problem.model.js
│   │   ├── submission.model.js
│   │   ├── chat.model.js
│   │   ├── message.model.js
│   │   ├── list.model.js
│   │   ├── contest.model.js
│   │   ├── request.model.js
│   │   └── problemsInList.model.js
│   │
│   ├── middlewares/              # Custom middleware
│   │   ├── auth.middleware.js    # JWT verification, Admin check
│   │   ├── validator.middleware.js
│   │   └── multer.middleware.js  # File upload handling
│   │
│   ├── validators/               # Input validation schemas
│   │   ├── auth.Validators.js
│   │   ├── chat.Validators.js
│   │   ├── contest.Validators.js
│   │   ├── friend.Validators.js
│   │   └── ...
│   │
│   ├── services/                 # External services
│   │   └── mail.service.js       # Email sending
│   │
│   ├── utils/                    # Helper functions
│   │   ├── constants.js
│   │   ├── cloudinary.js         # Cloudinary integration
│   │   ├── judgeO.js             # Judge0 API wrapper
│   │   ├── leetcode.js           # LeetCode API wrapper
│   │   └── chat.js               # Chat utilities
│   │
│   └── db/
│       └── db.js                 # Database connection
│
├── public/
│   └── images/                    # Static assets
│
├── .env                           # Environment variables (git ignored)
├── package.json
├── API_DOCUMENTATION.md           # Complete API docs
└── README.md                      # This file
```

---

## 🔐 Authentication

### How It Works

1. **Registration** → User creates account with email/password
2. **Login** → User gets JWT tokens stored in httpOnly cookies
3. **Protected Routes** → `verifyJWT` middleware validates token
4. **Token Refresh** → Auto-refresh expired access tokens
5. **Logout** → Tokens cleared from database and cookies

### User Roles

- **STUDENT** (default): Can solve problems, create lists, chat
- **ADMIN**: Can create/edit/delete problems, manage contests

### Middleware Stack

```
Request → 
  CORS Check → 
  Parse Body → 
  Parse Cookies → 
  [Route Handler] →
    verifyJWT (if protected) →
    checkAdmin (if admin-only) →
    validate (schema validation) →
    [Controller Function]
```

---

## 📦 Core Features

### 1. **Problem Management**
- Admins create problems with multiple test cases
- Support for JavaScript, Python, C++
- Reference solutions validated at creation time
- Users can view problems and attempt solutions

### 2. **Code Execution** 
- Execute user code against test cases
- Integration with Judge0 API
- Detailed output: status, memory, execution time
- Automatic submission tracking

### 3. **Submissions & Tracking**
- Store all code submissions
- Track accepted/wrong answer status
- Categorize by problem and language
- Users can review their solutions

### 4. **Custom Lists/Playlists**
- Organize problems by difficulty, topic, or custom criteria
- Add/remove problems from lists
- Track solved vs unsolved in each list

### 5. **Contests**
- Create manual contests using LeetCode links
- Set duration and question count (2-4)
- Automatic result calculation based on LeetCode submissions
- Track scores and leaderboard

### 6. **Real-time Social Features (TalkTown)**
- 1-on-1 and group chat
- File/image sharing (integrated with Cloudinary)
- Friend request system
- Search and connect with other users

---

## 🔗 Third-Party Integrations

### Cloudinary
```javascript
// Upload files/images
const { uploadOnCloudinary, deleteFromCloudinary } = require("./utils/cloudinary.js");
```

### Judge0 API
```javascript
// Execute code against test cases
const { submitBatch, pollBatchResults } = require("./utils/judgeO.js");
```

### LeetCode GraphQL
```javascript
// Fetch user submissions for contest verification
const { fetchLeetCodeSubmissions } = require("./utils/leetcode.js");
```

---

## 🚀 API Base URLs

```
Development:  http://localhost:5000/api/v1
Production:   https://your-domain.com/api/v1
```

### Example Requests

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@test.com","password":"pass123","fullname":"John Doe"}'

# Get all problems
curl -X GET http://localhost:5000/api/v1/problems/get-All-problems \
  -H "Cookie: accessToken=YOUR_TOKEN"

# Execute code
curl -X POST http://localhost:5000/api/v1/execute-code \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=YOUR_TOKEN" \
  -d '{"source_code":"...","language_id":63,"stdin":["input1"],"expected_outputs":["output1"],"problemId":"..."}'
```

---

## ⚠️ Known Issues & Recommendations

### Critical 🔴
1. **LeetCode Integration Incomplete** - `fetchLeetCodeSubmissions()` needs implementation
2. **Missing Validation** - `sendAttachmentValidation` not called as middleware
3. **No Error Handler** - Missing express error handling middleware

### Medium Priority 🟠
1. Add rate limiting on auth endpoints
2. Implement input sanitization
3. Add pagination to bulk queries
4. Standardize response structures
5. Add request ID tracking for debugging

### Low Priority 🟡
1. Inconsistent API naming conventions
2. Missing Swagger/OpenAPI docs
3. No comprehensive logging
4. Missing unit tests

**See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#issues--recommendations) for detailed recommendations.**

---

## 🧪 Testing

### Sample Test Data

```javascript
// Admin user
{
  email: "admin@leetlab.com",
  password: "Admin@123",
  role: "ADMIN"
}

// Regular user
{
  email: "user@leetlab.com",
  password: "User@123",
  role: "STUDENT"
}
```

---

## 🛡️ Security Best Practices

✅ **Implemented:**
- JWT-based authentication
- Password hashing with bcrypt
- httpOnly cookies for token storage
- CORS protection
- HTTPS ready for production

⚠️ **Needs Implementation:**
- Request rate limiting
- Input sanitization with express-validator
- SQL/NoSQL injection prevention
- CSRF protection
- Security headers (helmet.js)

---

## 📊 Database Models

All data is stored in MongoDB with proper indexing and relationships.

**Key Collections:**
- `users` - User profiles and authentication
- `problems` - DSA problems with test cases
- `submissions` - Code submissions and results
- `chats` - Group and 1-on-1 conversations
- `messages` - Chat messages and attachments
- `lists` - Custom problem organizing lists
- `contests` - Contest records and results
- `requests` - Friend request tracking

---

## 🔄 API Versioning

Current API version: **v1**  
All endpoints prefixed with `/api/v1`

Future upgrades will use `/api/v2`, `/api/v3`, etc.

---

## 📝 For Frontend Developers

### Authentication Flow

```javascript
// 1. Register
POST /auth/register
Response: { user, accessToken, refreshToken }

// 2. Login
POST /auth/login
Response: { user, accessToken, refreshToken }

// 3. Use accessToken for requests
GET /problems/get-All-problems
Headers: { Authorization: "Bearer accessToken" }
// OR use cookies automatically

// 4. Token expires → Refresh
POST /auth/refresh-token
Response: { accessToken, refreshToken }

// 5. Logout
POST /auth/logout
```

### Problem Solving Flow

```javascript
// 1. Get problems
GET /problems/get-All-problems

// 2. Select a problem
GET /problems/get-problem/:id

// 3. Write and test code
POST /execute-code
Body: { source_code, language_id, stdin, expected_outputs, problemId }

// 4. Submit final solution
// (automatic on successful execution)

// 5. Check submissions
GET /submission/get-all-submissions
GET /submission/get-submission/:problemId
```

---

## 🐛 Debugging

### Enable Logging

```bash
# Set debug mode
DEBUG=leetlab:* npm start
```

### Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check token expiry, refresh token |
| 403 Forbidden | Verify user has ADMIN role |
| 404 Not Found | Check if resource ID is valid |
| CORS Error | Verify frontend URL in .env |
| File Upload Failed | Check Cloudinary credentials |
| Code Execution Fails | Check Judge0 API key and language ID |

---

## 📞 Support

For API issues or questions:
1. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
2. Review controller implementations in `src/controllers/`
3. Check validation schemas in `src/validators/`
4. Review middleware in `src/middlewares/`

---

## 📋 Deployment Checklist

- [ ] Set all environment variables
- [ ] Change CORS origin to production frontend URL
- [ ] Enable HTTPS and set `secure: true` in cookies
- [ ] Set up MongoDB in production
- [ ] Configure Cloudinary account
- [ ] Get Judge0 API key
- [ ] Test all endpoints before deployment
- [ ] Set up error logging (Sentry/LogRocket)
- [ ] Configure backup strategy
- [ ] Set up monitoring and alerts

---

## 📄 License

This project is part of LeetLab. All rights reserved.

---

**Last Updated:** March 9, 2025  
**Version:** 1.0.0 Production Ready
