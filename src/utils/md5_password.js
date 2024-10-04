const crypto = require("crypto"); // 引入crypto模块

function md5password(password) {
  const md5 = crypto.createHash("md5"); // 创建md5对象
  const result = md5.update(password).digest("hex"); // 进行加密
  return result;
}

module.exports = md5password;
