const dtmRouter = require("@koa/router");
const loginController = require("../controller/loginController");
const { verifyLogin, verifyAuth } = require("../middleware/loginMiddleware");

const loginrouter = new dtmRouter({
  prefix: "/login",
});

loginrouter.post("/", verifyLogin, loginController.sign);
loginrouter.get("/test", verifyAuth, loginController.test);

module.exports = loginrouter;
