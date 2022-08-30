const bcrypt = require('bcryptjs');
const { User } = require('@models');

module.exports = async (req, res) => {
  try {
    const { ok, error } = validateSignUp(req, res); 
    if (!ok) {
      res.status(500).json({ error });
      return;
    }
    const { username, email, password } = req.body || {};
    const existingUser = await checkExistingUserByEmail(email);
    if (existingUser) {
      res.status(500).json({ message: 'user already exists' });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: 'successfully created a user',
      data: createdUser,
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const validateSignUp = (req, res) => {
  const { username, email, password } = req.body || {};
  const error = {};
  // Validation if fields are empty
  if (username === '') error.username = `Username is required`;
  if (email === '') error.email = `Email is required`;
  if (password === '') error.password = `Password is required`;
  // Validation for fields
  const emailPattern = /(@[a-z]+.[a-z]+)$/;
  if (email !== '' && !emailPattern.test(email)) error.email = `Not a valid email`;
  if (password !== '' && password.length < 8) error.password = `Password is too short`;
  
  return {
    ok: Object.keys(error).length === 0,
    error,
  };
}

const hashPassword = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      err ? reject(err) : resolve(hash);
    });
  });
});

const checkExistingUserByEmail = async email => {
  const existingUser = await User.findOne({
    where: { email }
  });
  return existingUser;
}