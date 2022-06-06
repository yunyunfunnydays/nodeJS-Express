const bcrypt = require('bcryptjs');

const bcryptPassword = async (appliedPassword) => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT));
  const password = await bcrypt.hash(appliedPassword, salt);
  return password;
};

module.exports = bcryptPassword;
