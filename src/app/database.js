const mysql = require("mysql2");

// 1、创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "dtm20031126",
  database: "dtmhub",
  connectionLimit: 10,
});
// 2、获取连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败", err);
  } else {
    console.log("数据库连接成功");
  }
});

// 3、获取连接池中连接对象（promise)
const connection = connectionPool.promise();

module.exports = connection;
