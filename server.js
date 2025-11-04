const express = require('express');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/document');
const apiLimiter = require("./middleware/rateLimit");
const cors = require('cors');
const { authenticateJWT, authorizeRoles } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

connectDB();


app.use(cors({ origin: process.env.APP_BASE_URL || 'http://localhost:5173' })); // your frontend address

app.use('/api/', apiLimiter);
app.use('/api/auth', authRoutes);

// Protect document routes and restrict create/update/delete to owner/editor roles
app.use('/api/documents', authenticateJWT, documentRoutes);

// Example to restrict a single route to certain roles
app.post('/api/documents', authenticateJWT, authorizeRoles('owner', 'editor'), (req, res, next) => {
  next(); // proceed to document creation logic in routes
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
