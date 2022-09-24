const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('@models');

module.exports = async (req, res) => {
  try {
    const { ok, error } = validateSignIn(req, res);
    if (!ok) {
      res.status(500).json({ error });
      return;
    }
    const { email, password } = req.body || {};
    const existingUser = await checkExistingUserByEmail(email);
    if (!existingUser) {
      res.status(401).json({
        message: "invalid email or password"
      });
      return;
    }
    const { result } = await checkPassword(password, existingUser.password);
    if (existingUser && !result) {
      res.status(401).json({
        message: "invalid email or password"
      });
      return;
    }
    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET_TOKEN,
    );
    res
      .cookie('token', token, { httpOnly: true })
      .status(200).json({
        message: 'successfully logged in',
        data: {
          id: existingUser?.id,
          email: existingUser?.email,
          username: existingUser?.username,
          token,
        },
      });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'sign in error',
    });
  }
}

const validateSignIn = (req, res) => {
  const { email, password } = req.body || {};
  const error = {};
  const emailPattern = /(@[a-z]+.[a-z]+)$/;
  if (!email || email === '') error.email = 'Email is required';
  if (!password || password === '') error.password = 'Password is required';
  if (email !== '' && !emailPattern.test(email)) error.email = `Not a valid email`;
  
  return {
    ok: Object.keys(error).length === 0,
    error,
  };
}

const checkExistingUserByEmail = async email => {
  const existingUser = await User.findOne({
    where: { email }
  });
  return existingUser;
}

const checkPassword = (plainTextPassword, hashedPassword) => new Promise((resolve, reject) => {
  bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
    err ? reject({ result, error: err }) : resolve({ result });
  });
});