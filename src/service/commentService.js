const connection = require("../app/database");
class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(statement, [
      momentId,
      content,
      userId,
    ]);
    return result;
  }

  async reply(commentId, content, userId, momentId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id, comment_id) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [
      momentId,
      content,
      userId,
      commentId,
    ]);
    return result;
  }
}
module.exports = new CommentService();
