const router = require('express').Router();

const Auth = require('@controllers/Auth');
const AuthMiddleware = require('@middlewares/Auth');

router
  .post('/signup', Auth.signUpController)
  .post(
    '/signin',
    AuthMiddleware.signInMiddleware,
    Auth.signInController
  )

module.exports = router;