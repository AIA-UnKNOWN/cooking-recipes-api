const jwt = require('jsonwebtoken');
const { User } = require('@models');

module.exports = async (req, res, next) => {
  if (req?.headers?.authorization !== '') {
    try {
      /**
       * Example bearer token -> 'Bearer abcdefg...-/|12345++<>xyz'
       */
      const bearerToken = req.headers.authorization.split(' ')[1];
      authenticateWithAuthToken({ authToken: bearerToken, res, next});
    } catch(error) {
      res.clearCookie('auth-token');
      next();
    }
  } else {
    next();
  }
}

const verifyUser = token => new Promise((resolve, reject) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    user && resolve({ userId: user.userId });
  } catch(error) {
    reject({ error: error.message });
  }
});

const authenticateWithAuthToken = async ({ authToken, res, next }) => {
  try {
    const { userId } = await verifyUser(authToken);
    const user = await User.findOne({ where: { id: userId } });
    res
      .cookie('auth-token', authToken, { httpOnly: true })
      .status(200)
      .json({
        message: 'successfully logged in',
        data: {
          id: user?.id,
          email: user?.email,
          username: user?.username,
          token: authToken,
        },
      });
  } catch(error) {
    console.log("authTokenError", error);
    next();
  }
}