const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // for parsing application/json

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
