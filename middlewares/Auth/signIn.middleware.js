const jwt = require('jsonwebtoken');
const { User } = require('@models');

module.exports = async (req, res, next) => {
  if (req?.cookies?.token !== '') {
    try {
      const { userId } = await verifyUser(req.cookies.token);
      if (userId) {
        const user = await User.findOne({ where: { id: userId } });
        res
          .cookie('token', req.cookies.token, { httpOnly: true })
          .status(200).json({
            message: 'successfully logged in',
            data: {
              id: user?.id,
              email: user?.email,
              username: user?.username,
            },
          });
        return;
      }
    } catch(error) {
      res.clearCookie('token');
    }
  }
  next();
}

const verifyUser = token => new Promise((resolve, reject) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    user && resolve({ userId: user.userId });
  } catch(error) {
    reject({ error: error.message });
  }
});