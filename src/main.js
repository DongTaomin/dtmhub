const app = require("./app/index");
const { SERVER_PORT } = require("./config/server");

// 错误处理中间件
// require("./utils/handleError");

// 启动服务器
app.listen(SERVER_PORT, () => {
  console.log("dtmhub服务启动成功");
});
