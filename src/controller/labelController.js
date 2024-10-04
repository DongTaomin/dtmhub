const LabelService = require("../service/labelService");

class labelController {
  async create(ctx, next) {
    const { label } = ctx.request.body;
    const result = await LabelService.create(label);
    ctx.body = {
      code: 0,
      message: "标签创建成功",
      data: result,
    };
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await LabelService.list(offset, size);
    ctx.body = {
      code: 0,
      message: "标签列表获取成功",
      data: result,
    };
  }
  //   async detail(ctx, next) {
  //     const { labelId } = ctx.params;
  //     const result = await LabelService.detail(labelId);
  //     ctx.body = {
  //       code: 0,
  //       message: "标签详情获取成功",
  //       data: result,
  //     };
  //   }

  //   async update(ctx, next) {
  //     const { labelId } = ctx.params;
  //     const { name } = ctx.request.body;
  //     const result = await LabelService.update(labelId, name);
  //     ctx.body = {
  //       code: 0,
  //       message: "标签更新成功",
  //       data: result,
  //     };
  //   }

  //   async remove(ctx, next) {
  //     const { labelId } = ctx.params;
  //     const result = await LabelService.remove(labelId);
  //     ctx.body = {
  //       code: 0,
  //       message: "标签删除成功",
  //       data: result,
  //     };
  //   }
}
module.exports = new labelController();
