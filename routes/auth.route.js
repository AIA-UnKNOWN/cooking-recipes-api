const router = require('express').Router();

const Auth = require('@controllers/Auth');

router
  .post('/signup', Auth.signUpController)
  .post('/signin', Auth.signInController)

module.exports = router;