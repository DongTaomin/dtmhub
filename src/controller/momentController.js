const momentService = require("../service/momentService");
class momentController {
  async create(ctx, next) {
    // 1、获取要发表的动态
    const { title } = ctx.request.body;

    // 2、动态是谁发表的
    const { id } = ctx.token;

    // 3、将数据存储到数据库
    const result = await momentService.create(title, id);

    ctx.body = {
      code: 0,
      message: "动态创建成功",
      data: result,
    };
  }

  async list(ctx, next) {
    // 查询参数
    const { offset, size } = ctx.query;
    // 从数据库中查询数据
    const result = await momentService.queryList(offset, size);
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async detail(ctx, next) {
    // 1、获取动态id
    const { momentId } = ctx.params;
    // 2、根据动态id查询动态详情
    const result = await momentService.getMomentById(momentId);
    // 3、返回数据
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async update(ctx, next) {
    // 1、获取动态id
    const { momentId } = ctx.params;
    // 2、获取动态内容
    const { title } = ctx.request.body;
    // 3、更新动态
    const result = await momentService.update(title, momentId);
    ctx.body = {
      code: 0,
      message: "动态更新成功",
      data: result,
    };
  }

  async remove(ctx, next) {
    // 1、获取动态id
    const { momentId } = ctx.params;
    // 2、删除动态
    const result = await momentService.remove(momentId);
    ctx.body = {
      code: 0,
      message: "动态删除成功",
      data: result,
    };
  }

  async addLabels(ctx, next) {
    const labels = ctx.labels;
    const momentId = ctx.params.momentId;
    // 将标签存储到moment_label关系表中
    try {
      for (const label of labels) {
        // 判断标签是否已经存在
        const isExist = await momentService.labelIsExist(label.id, momentId);
        if (isExist) {
          continue;
        } else {
          const result = await momentService.addLabel(label.id, momentId);
        }
      }

      ctx.body = {
        code: 0,
        message: "标签添加成功",
      };
    } catch (error) {
      ctx.body = {
        code: -7,
        message: "标签创建失败",
        data: error,
      };
    }
  }
}

module.exports = new momentController();
