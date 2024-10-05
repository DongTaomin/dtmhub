const UserService = require("../service/userService");
const fileService = require("../service/fileService");
const { SERVER_HOST, SERVER_PORT, FOLDER_PATH } = require("../config/server");
const fs = require("fs");
class UesrController {
  async create(ctx, next) {
    // 1、获取用户信息
    const { name, password } = ctx.request.body;

    // 2、将用户信息存储到数据库
    const result = await UserService.create({ name, password });
    // 默认头像一个空白头像
    const avatar = await UserService.initAvatar(5);
    const { filename, mimetype, size } = avatar;
    const result3 = await UserService.getUserByName(name);
    const userId = result3[0].id;
    const result2 = await fileService.create(filename, mimetype, size, userId);
    const class4 = await UserService.updateAvatarByUserId(
      `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${userId}`,
      userId
    );
    // 3、返回结果
    ctx.body = {
      message: "用户创建成功",
      data: result,
    };
  }

  async showAvatar(ctx, next) {
    const { userId } = ctx.params;

    // 获取用户头像信息
    const result = await UserService.getAvatarByUserId(userId);

    // 读取头像所在的文件
    const { filename, mimetype } = result;
    ctx.body = fs.createReadStream(`${FOLDER_PATH}/${filename}`);
    ctx.type = mimetype;
  }
}
module.exports = new UesrController();
