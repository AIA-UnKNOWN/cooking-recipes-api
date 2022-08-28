const router = require('express').Router();

const Auth = require('@controllers/Auth');

router
  .post('/signup', Auth.signUpController)

module.exports = router;