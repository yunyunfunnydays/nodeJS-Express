const bcrypt = require('bcryptjs/dist/bcrypt');
const validator = require('validator');

const User = require('../model/UsersModel');

const appError = require('../service/appError');
const bcryptPassword = require('../service/bcryptPassword');
const { generateSendJWT } = require('../service/auth');
const handleSuccess = require('../service/handleSuccess');

const usersControllers = {
  async signUp(req, res, next) {
    const {
      name,
      email,
      appliedPassword,
      confirmPassword,
    } = req.body;
    if (!name || !email || !appliedPassword || !confirmPassword) {
      appError(400, '必填欄位不得為空', next);
      return;
    }
    if (appliedPassword !== confirmPassword) {
      appError(400, '密碼輸入不一致', next);
      return;
    }
    if (!validator.isLength(appliedPassword, { min: 8 })) {
      appError(400, '密碼字數需為8碼以上', next);
      return;
    }
    if (!validator.isEmail(email)) {
      appError(400, 'email 格式錯誤', next);
      return;
    }

    const password = await bcryptPassword(appliedPassword);
    const newUser = await User.create({
      email,
      name,
      password,
    });
    generateSendJWT(newUser, 201, res);
  },
  async signIn(req, res, next) {
    console.log('singIn');
    const { email, password } = req.body;
    if (!email || !password) {
      appError(400, '帳號密碼不得為空', next);
      return;
    }
    const user = await User.findOne({ email }).select('+password');
    console.log(user);
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      appError(400, '密碼錯誤', next);
      return;
    }
    generateSendJWT(user, 200, res);
  },
  async getProfile(req, res, next) {
    handleSuccess(res, req.user);
  },
  async updatePassword(req, res, next) {
    const { appliedPassword, confirmPassword } = req.body;
    if (appliedPassword !== confirmPassword) {
      appError(400, '密碼不一致', next);
      return;
    }
    const newPassword = await bcryptPassword(appliedPassword);

    const user = await User.findByIdAndUpdate(req.user.id, {
      password: newPassword,
    });
    generateSendJWT(user, 200, res);
  },
};

module.exports = usersControllers;
