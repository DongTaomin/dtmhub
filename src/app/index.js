const koa = require("koa");
const bodyparser = require("koa-bodyparser");
const dtmrouter = require("../router/userRouter");
const loginrouter = require("../router/loginRouter");
const momentRouter = require("../router/momentRouter");
const commentRouter = require("../router/commentRouter");
const labelRouter = require("../router/labelRouter");
const filerouter = require("../router/fileRouter");

// 创建app对象
const app = new koa();

app.use(bodyparser());
app.use(dtmrouter.routes()).use(dtmrouter.allowedMethods());
app.use(loginrouter.routes()).use(loginrouter.allowedMethods());
app.use(momentRouter.routes()).use(momentRouter.allowedMethods());
app.use(commentRouter.routes()).use(commentRouter.allowedMethods());
app.use(labelRouter.routes()).use(labelRouter.allowedMethods());
app.use(filerouter.routes()).use(filerouter.allowedMethods());

module.exports = app;
