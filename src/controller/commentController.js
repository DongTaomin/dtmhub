const CommentService = require("../service/commentService");
class commentController {
  async create(ctx, next) {
    // 1、获取用户信息
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.token;
    // 2、判断用户评论内容是否为空
    if (!content) {
      ctx.body = {
        code: -1,
        message: "评论内容不能为空",
      };
      return;
    }

    // console.log(momentId, content, id);
    // // 3、操作数据库
    const result = await CommentService.create(momentId, content, id);

    // 4、返回数据
    ctx.body = {
      code: 0,
      message: "发表评论成功",
      data: result,
    };
  }

  async reply(ctx, next) {
    // 1、获取用户信息
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.token;
    // 2、判断用户评论内容是否为空
    if (!content) {
      ctx.body = {
        code: -1,
        message: "回复内容不能为空",
      };
      return;
    }
    // console.log(momentId, commentId, content, id);

    // 3、操作数据库
    const result = await CommentService.reply(commentId, content, id, momentId);
    // 4、返回数据
    ctx.body = {
      code: 0,
      message: "回复评论成功",
      data: result,
    };
  }
}

module.exports = new commentController();
