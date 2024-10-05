const connection = require("../app/database");
class MomentService {
  async create(content, user_id) {
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [content, user_id]);
    return result;
  }

  async queryList(offset = 0, size = 10) {
    const statement = `select m.id id, m.content content,m.createAt createTime, m.updateAt updateTime,
json_object('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) user,
(select count(*)  from comment where moment_id = m.id) commentCount,
(select count(*)  from moment_label where moment_id = m.id) labelCount 
FROM moment m left join user u on u.id = m.user_id limit ?,?;`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async getMomentById(momentId) {
    const statement1 = `select m.id id, m.content content,m.createAt createTime, m.updateAt updateTime,
    json_object('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'updateTime',u.updateAt) user,
    (select count(*)  from comment where moment_id = m.id) commentCount,
    (select count(*)  from moment_label where moment_id = m.id) labelCount
    FROM moment m left join user u on u.id = m.user_id 
    where m.id = ?;`;
    const [result1] = await connection.execute(statement1, [momentId]);
    const statement2 = `select id, content,comment_id ,createAt  from comment where moment_id = ?;`;
    const [result2] = await connection.execute(statement2, [momentId]);
    const statement3 = `select  user_id from comment where moment_id = ?;`;
    const [result3] = await connection.execute(statement3, [momentId]);

    if (result3.length === 0) {
      return result1;
    } else {
      const userId = result3[0].user_id;
      const statement4 = `select id, name, avatar_url from user where id = ?;`;
      const [result4] = await connection.execute(statement4, [userId]);

      for (let i = 0; i < result2.length; i++) {
        result2[i].user = result4[0];
      }
      // 查询标签
      const statement5 = `select label_id from moment_label where moment_id = ?;`;
      const [result5] = await connection.execute(statement5, [momentId]);

      for (let i = 0; i < result5.length; i++) {
        const statement6 = `select name from label where id = ?;`;
        const [result6] = await connection.execute(statement6, [
          result5[i].label_id,
        ]);
        result5[i].name = result6[0].name;
      }

      // console.log(result, result2);
      const data = { ...result1[0], commentsList: result2, labels: result5 };
      const array = [data];
      // 将结果转化为数组

      return array;
    }
  }

  async update(content, momentId) {
    const statement = `update moment set content = ? where id = ?;`;

    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `delete from moment where id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async labelIsExist(labelId, momentId) {
    const statement = `select * from moment_label where label_id = ? and moment_id = ?;`;
    const [result] = await connection.execute(statement, [labelId, momentId]);
    return Boolean(result.length);
  }

  async addLabel(labelId, momentId) {
    const statement = `insert into moment_label (moment_id, label_id) values (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}
module.exports = new MomentService();
