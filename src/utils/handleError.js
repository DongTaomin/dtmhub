const app = require("../app");
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
