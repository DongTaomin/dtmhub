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

  // 初始化用户头像
  async initAvatar(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }

  // 获取头像信息
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    const data = result[result.length - 1];
    console.log(data);
    return data;
  }

  // 更新头像
  async updateAvatarByUserId(avatar_url, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatar_url, userId]);
    return result;
  }
}
module.exports = new UserService();
