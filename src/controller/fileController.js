const fileService = require("../service/fileService");
const userService = require("../service/userService");
const { SERVER_HOST, SERVER_PORT } = require("../config/server");
class fileController {
  async upload(ctx) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.token;
    // 存入数据库
    const result = await fileService.create(filename, mimetype, size, id);
    // 存入user表
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`;
    const class4 = await userService.updateAvatarByUserId(avatarUrl, id);

    ctx.body = {
      code: 0,
      message: "头像上传成功",
      avatarUrl: avatarUrl,
    };
  }
}

module.exports = new fileController();
