require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const registerRoutes = require('@routes');
const app = express();
const PORT = process.env.PORT || 9898;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: `Welcome to Cooking Recipes API`,
  });
});
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Successfully connected to http://localhost:${PORT}`);
});