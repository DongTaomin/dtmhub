const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");
const { EXPIRATION_TIME } = require("../config/server");

class loginController {
  sign(ctx, next) {
    // 1、获取用户信息
    const { id, name } = ctx.user;
    // 2.颁发token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: EXPIRATION_TIME,
      algorithm: "RS256",
    });

    // 3、返回数据
    ctx.body = {
      code: 0,
      data: {
        message: "登录成功",
        token,
        id,
        name,
      },
    };
  }
  test(ctx, next) {
    ctx.body = {
      data: "验证身份通过",
    };
  }
}

module.exports = new loginController();
