const KoaRouter = require("@koa/router");
const userController = require("../controller/userController");
const { verifyUser, handlePassword } = require("../middleware/userMiddleware");

// 创建路由对象
const dtmrouter = new KoaRouter({
  prefix: "/user",
});

// 定义路由映射
dtmrouter.get("/list", (ctx, next) => {
  ctx.body = " hello world1";
});
dtmrouter.post("/", verifyUser, handlePassword, userController.create);

module.exports = dtmrouter;
