const dotenv = require("dotenv");
dotenv.config();

const { SERVER_HOST, SERVER_PORT, EXPIRATION_TIME, FOLDER_PATH } = process.env;

module.exports = {
  SERVER_HOST,
  SERVER_PORT,
  EXPIRATION_TIME,
  FOLDER_PATH,
};
