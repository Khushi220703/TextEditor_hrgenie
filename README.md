📄 Document Management API

This is the backend API for the Document Management Application, providing secure CRUD operations, AI integration, and role-based access control.

🚀 Features

🔒 User Authentication using JWT

📂 Document CRUD Operations with access control & permissions

🤖 AI Integration for writing assistance (via Google Gemini API)

⚙️ Rate Limiting to prevent abuse

🧼 Input Sanitization to prevent XSS attacks

🔐 Environment Variable Management using dotenv

🧩 Comprehensive Error Handling and validation

🛠️ Getting Started
Prerequisites

Before running the project, ensure you have:

Node.js ≥ 16

MongoDB (local or cloud instance)

Installation

Clone the repository

git clone https://github.com/your-username/document-management-api.git
cd document-management-api


Install dependencies

npm install


Create a .env file in the project root:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
APP_BASE_URL=http://localhost:5173


Start the server

npm start

📡 API Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/login	Authenticate user and get token	Public
GET	/api/documents	List user’s documents	Authenticated
POST	/api/documents	Create a document	Owner / Editor
PUT	/api/documents/:id	Update a document	Owner / Editor
DELETE	/api/documents/:id	Delete a document	Owner only
POST	/api/documents/:id/share	Generate a shareable link	Owner only
GET	/api/shared/:token	Access shared document via token	Public
🧰 Security

Implements rate limiting using express-rate-limit

Uses JWT authentication for all protected routes

All environment variables managed via .env and loaded with dotenv

Includes input sanitization and role-based access control

🧪 Example Usage

Login Request

POST /api/auth/login
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "yourpassword"
}


Response

{
  "token": "your_jwt_token",
  "user": {
    "id": "64e1b2a9f29...",
    "email": "user@example.com",
    "role": "owner"
  }
}

📁 Project Structure
📦 document-management-api
├── 📁 config/           # Configuration files (DB, rate limiting, etc.)
├── 📁 controllers/      # Route controller logic
├── 📁 middleware/       # Auth, error handling, and validation
├── 📁 models/           # Mongoose models
├── 📁 routes/           # API route definitions
├── server.js            # Entry point
└── .env.example         # Example environment variables
