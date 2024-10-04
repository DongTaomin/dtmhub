const momentService = require("../service/momentService");
const verifyPermissions = async (ctx, next) => {
  // 1、获取用户信息
  const { id } = ctx.token;

  // 2、获取动态id
  const { momentId } = ctx.params;

  // 3、根据动态id查询动态详情
  //   const [
  //     {
  //       user: { id: userId },
  //     },
  //   ] = await momentService.getMomentById(momentId);
  const result = await momentService.getMomentById(momentId);
  // 4、判断用户是否有权限

  if (!result) {
    ctx.body = {
      code: -3,
      message: "该动态不存在或已被删除",
    };
    return;
  } else if (result[0].user.id !== id) {
    ctx.body = {
      code: -6,
      message: "没有操作权限",
    };
    return;
  } else {
    await next();
  }
};
module.exports = { verifyPermissions };
