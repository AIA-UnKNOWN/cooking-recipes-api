require('module-alias/register');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const registerRoutes = require('@routes');
const app = express();
const PORT = process.env.PORT || 9898;

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());
app.use(cookieParser());
app.use('/videos', express.static('storage/videos'));
app.use('/images', express.static('storage/images'));

app.get('/', (req, res) => {
  res.json({
    message: `Welcome to Cooking Recipes API`,
  });
});
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Successfully connected to http://localhost:${PORT}`);
});