const koaRouter = require("@koa/router");
const fileController = require("../controller/fileController");
const { verifyAuth } = require("../middleware/loginMiddleware");
const { handAvatar } = require("../middleware/fileMiddlewrae");

const filerouter = new koaRouter({
  prefix: "/file",
});
// 编写接口
// 上传头像
filerouter.post("/avatar", verifyAuth, handAvatar, fileController.upload);

module.exports = filerouter;
