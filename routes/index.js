const authRoute = require('./auth.route');
const recipeRoute = require('./recipe.route');

module.exports = app => {
  /* Routers */
  app.use('/auth', authRoute);
  app.use('/recipe', recipeRoute);
}