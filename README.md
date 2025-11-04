Document Management API
This is the backend API for the Document Management application. It provides secure CRUD operations and AI integration.

Features
User authentication (JWT)

Document CRUD with access control & permissions

AI integration for writing assistance (Google Gemini API)

Rate limiting to prevent abuse

Input sanitization to prevent XSS

Secure environment variable management with dotenv

Error handling and validation

Getting Started
Prerequisites
Node.js >= 16

MongoDB instance (local or cloud)



Installation
Clone repo

Run npm install

Create .env file:

text
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
APP_BASE_URL=http://localhost:5173
Start server: npm start

API Endpoints
POST /api/auth/login - Authenticate user

GET /api/documents - List user's documents

POST /api/documents - Create a document (owner/editor)

PUT /api/documents/:id - Update a document (owner/editor)

DELETE /api/documents/:id - Delete a document (owner only)

POST /api/documents/:id/share - Create a shareable link (owner only)

GET /api/shared/:token - Access shared document via token

Security
Uses express-rate-limit for rate limiting

JWT used for authentication and access control

Environment variables managed via .env and dotenv