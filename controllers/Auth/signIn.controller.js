const bcrypt = require('bcryptjs');
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
      res.status(500).json({
        message: "invalid email or password"
      });
      return;
    }
    const { result } = await checkPassword(password, existingUser.password);
    if (existingUser && !result) {
      res.status(500).json({
        message: "invalid email or password"
      });
      return;
    }
    res.status(200).json({
      message: 'successfully logged in',
      data: existingUser,
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const validateSignIn = (req, res) => {
  const { email, password } = req.body || {};
  const error = {};
  const emailPattern = /(@[a-z]+.[a-z]+)$/;
  if (email === '') error.email = 'Email is required';
  if (password === '') error.password = 'Password is required';
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