const KoaRouter = require("@koa/router");
const userController = require("../controller/userController");
const { verifyUser, handlePassword } = require("../middleware/userMiddleware");

// 创建路由对象
const dtmrouter = new KoaRouter({
  prefix: "/user",
});

// 定义路由映射

// 测试用
dtmrouter.get("/list", (ctx, next) => {
  ctx.body = " hello world1";
});

// 创建用户
dtmrouter.post("/", verifyUser, handlePassword, userController.create);

// 获取用户头像
dtmrouter.get("/avatar/:userId", userController.showAvatar);

module.exports = dtmrouter;
