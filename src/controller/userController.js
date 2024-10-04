const UserService = require("../service/userService");
class UesrController {
  async create(ctx, next) {
    // 1、获取用户信息
    const { name, password } = ctx.request.body;

    // 2、将用户信息存储到数据库
    const result = await UserService.create({ name, password });
    ctx.body = {
      message: "用户创建成功",
      data: result,
    };
    // 3、查看存储结果，告知前端创建成功
  }
}
module.exports = new UesrController();
