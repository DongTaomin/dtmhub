const koaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/loginMiddleware");
const momentController = require("../controller/momentController");
const { verifyPermissions } = require("../middleware/permissionsMiddleware");
const { verifyLabelIsExist } = require("../middleware/labelMiddleware");

const momentRouter = new koaRouter({
  prefix: "/moment",
});
// 编写接口

// 创建动态
momentRouter.post("/", verifyAuth, momentController.create);
// 获取动态
momentRouter.get("/", momentController.list);
// 获取动态详情
momentRouter.get("/:momentId", momentController.detail);
// 删除动态(这里需要验证token，只有登录的用户才能删除动态)
momentRouter.delete(
  "/:momentId",
  verifyAuth,
  verifyPermissions,
  momentController.remove
);
// 修改动态(这里需要验证token，只有登录的用户才能修改动态)
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyPermissions,
  momentController.update
);
// 添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermissions,
  verifyLabelIsExist,
  momentController.addLabels
);
// // 删除标签
// momentRouter.delete(
//   "/:momentId/label/:labelId",
//   verifyAuth,
//   verifyPermissions,
//   momentController.removeLabel
// );

module.exports = momentRouter;
