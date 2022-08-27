const express = require('express');
const app = express();
const PORT = process.env.PORT || 9898;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: `Welcome to Cooking Recipes API`,
  });
});

app.listen(PORT, () => {
  console.log(`Successfully connected to http://localhost:${PORT}`);
});