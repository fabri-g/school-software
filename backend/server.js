const express = require('express');
const app = express();
const port = 3001;

// Middleware setup
app.use(express.json()); // for parsing application/json

// Routes setup
const roomsRouter = require('./routes/rooms');
app.use('/api/rooms', roomsRouter);
const studentsRouter = require('./routes/students');
app.use('/api/students', studentsRouter);

//Handle errors
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('An internal error occurred');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
