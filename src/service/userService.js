const connection = require("../app/database");

// 创建数据库操作类
class UserService {
  // 1、创建用户
  async create(user) {
    // 1、获取用户
    const { name, password } = user;

    // 2、编写sql语句
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;

    // 3、执行sql
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  // 2、查询用户
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0]; // 返回的是数组[result,fields]，所以取第一个
  }
}
module.exports = new UserService();
