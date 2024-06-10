const express = require('express');
const app = express();
const port = 3001;

app.get('/data', (req, res) => {
  res.json({ john: 1 });
});

app.get('/', (req, res) => {
    res.json({ john: 1 });
  });

app.listen(port, () => {
  console.log(`Node.js server is running on http://localhost:${port}`);
});
