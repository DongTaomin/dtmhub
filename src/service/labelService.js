const connection = require("../app/database");
class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async list(offset = 0, size = 10) {
    const statement = `SELECT * FROM label limit ?,?;`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label where name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
