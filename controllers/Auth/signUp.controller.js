const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  res.json({
    message: 'Sign up route',
    body: req.body,
  });
}