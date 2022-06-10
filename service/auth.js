const jwt = require('jsonwebtoken');
const handleErrorAsync = require('./handleErrorAsync');
const appError = require('./appError');
const User = require('../model/UsersModel');

const generateSendJWT = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_DAY,
    },
  );
  user.passWord = undefined;
  res.status(statusCode).json({
    status: 'success',
    user: {
      name: user.name,
      token,
    },
  });
};

const isAuth = handleErrorAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    appError(400, '你尚未登入', next);
    return;
  }
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(appError(400, '認證失敗，請重新登入訊息', next));
      } else {
        resolve(payload);
      }
    });
  });
  const currentUser = await User.findById(decoded.id);
  req.user = currentUser;
  next();
});

module.exports = { generateSendJWT, isAuth };
