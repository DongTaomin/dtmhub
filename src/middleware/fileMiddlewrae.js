const multer = require("@koa/multer");
const { FOLDER_PATH } = require("../config/server");

const uploadAvatar = multer({
  dest: FOLDER_PATH,
});
const handAvatar = uploadAvatar.single("avatar");

module.exports = {
  handAvatar,
};
