const koaRouter = require("@koa/router");
const commentController = require("../controller/commentController");
const { verifyAuth } = require("../middleware/loginMiddleware");
const { verifyPermissions } = require("../middleware/permissionsMiddleware");
const commentRouter = new koaRouter({
  prefix: "/comment",
});
// 编写接口
// 创建评论
commentRouter.post("/", verifyAuth, commentController.create);
// 回复评论
commentRouter.post("/reply", verifyAuth, commentController.reply);
// // 删除评论(这里需要验证token，只有登录的用户才能删除评论)
// commentRouter.delete(
//   "/:commentId",
//   verifyAuth,
//   verifyPermissions,
//   commentController.remove
// );
// // 修改评论(这里需要验证token，只有登录的用户才能修改评论)

module.exports = commentRouter;
