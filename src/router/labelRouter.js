const dtmRouter = require("@koa/router");
const labelController = require("../controller/labelController");
const { verifyAuth } = require("../middleware/loginMiddleware");

const labelRouter = new dtmRouter({
  prefix: "/label",
});
labelRouter.post("/", verifyAuth, labelController.create);
labelRouter.get("/", labelController.list);
// labelRouter.get("/:labelId", labelController.detail);
// labelRouter.patch("/:labelId", labelController.update);
// labelRouter.delete("/:labelId", labelController.remove);
module.exports = labelRouter;
