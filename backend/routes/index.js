// routes/index.js
const express = require('express');
const router = express.Router();

// Import modules
const roomsRouter = require('./rooms');
const studentsRouter = require('./students');
const authRoutes = require('./auth');

// Use routes
router.use('/api/rooms', roomsRouter);
router.use('/api/students', studentsRouter);
router.use('/api/auth', authRoutes);

module.exports = router;
