require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middleware/errorHandler');

// Use CORS middleware
app.use(cors());

// Middleware setup
app.use(express.json()); // for parsing application/json

// Routes setup
const roomsRouter = require('./routes/rooms');
app.use('/api/rooms', roomsRouter);
const studentsRouter = require('./routes/students');
app.use('/api/students', studentsRouter);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Error logging middleware
app.use(errorHandler);

// Fallback error handler
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(error.status || 500).send(error.message || 'An internal error occurred');
});

// Starting the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
