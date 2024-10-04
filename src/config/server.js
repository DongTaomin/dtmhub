const dotenv = require("dotenv");
dotenv.config();

const { SERVER_PORT, EXPIRATION_TIME } = process.env;

module.exports = {
  SERVER_PORT,
  EXPIRATION_TIME,
};
