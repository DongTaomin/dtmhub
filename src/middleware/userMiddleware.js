const UserService = require("../service/userService");
const md5password = require("../utils/md5_password");
// 判断用户
const verifyUser = async (ctx, next) => {
  // 1、获取用户信息
  const { name, password } = ctx.request.body;

  // 判断用户是否存在
  // 用户名或密码不能为空
  if (!name || !password) {
    ctx.body = {
      code: -1,
      message: "用户名或密码不能为空",
    };
    return;
  }
  // 判断用户是否已经存在
  const user = await UserService.getUserByName(name);
  if (user.length) {
    ctx.body = {
      code: -2,
      message: "该用户名已存在",
    };
    return;
  }

  await next();
};

// 密码加密
const handlePassword = async (ctx, next) => {
  // 1、取出密码
  const { password } = ctx.request.body;

  // 2、对密码进行加密
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = { verifyUser, handlePassword };
