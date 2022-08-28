const authRoute = require('./auth.route');

module.exports = app => {
  /* Routers */
  app.use('/auth', authRoute);
}