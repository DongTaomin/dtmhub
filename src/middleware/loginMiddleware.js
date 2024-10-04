const UserService = require("../service/userService");
const md5password = require("../utils/md5_password");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../config/screct");

const verifyLogin = async (ctx, next) => {
  // 1、获取用户信息
  const { name, password } = ctx.request.body;
  // 2、判断用户名和密码是否为空
  if (!name || !password) {
    ctx.body = {
      code: -1,
      message: "用户名或密码不能为空",
    };
    return;
  }
  // 3、判断用户是否在数据库中存在
  const result = await UserService.getUserByName(name);
  if (result.length === 0) {
    ctx.body = {
      code: -3,
      message: "登录的用户不存在，请先注册",
    };
    return;
  }
  //   console.log(result);

  // 4、判断密码是否与数据库中的密码一致
  if (result[0].password !== md5password(password)) {
    ctx.body = {
      code: -4,
      message: "密码错误，请重新输入密码",
    };
    return;
  }

  //   console.log(name, password);

  // 5、将用户信息存储到ctx中
  ctx.user = result[0];
  // 执行下一个中间件
  await next();
};
const verifyAuth = async (ctx, next) => {
  // 1、获取token
  const authorization = ctx.header.authorization;

  if (!authorization) {
    ctx.body = {
      code: -5,
      message: "无效的token",
    };

    return;
  } else {
    const token = authorization.replace("Bearer ", "");
    // 2、验证token
    try {
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ["RS256"],
      });
      // 保留token
      ctx.token = result;
      await next();
    } catch (error) {
      ctx.body = {
        code: -5,
        data: error,
        message: "无效的token",
      };
    }
  }
};
module.exports = { verifyLogin, verifyAuth };
