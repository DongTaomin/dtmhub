const fs = require("fs");
// 默认情况下相对目录和项目的启动目录有关系
const PRIVATE_KEY = fs.readFileSync("./src/config/keys/private_key.pem");
const PUBLIC_KEY = fs.readFileSync("./src/config/keys/public.key");
module.exports = { PRIVATE_KEY, PUBLIC_KEY };
