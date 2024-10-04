const LabelService = require("../service/labelService");
const verifyLabelIsExist = async (ctx, next) => {
  // 1、获取标签信息
  const { labels } = ctx.request.body;
  const newLabels = [];

  // 2、判断所有标签是否已经存在于label表中
  for (const name of labels) {
    const result = await LabelService.getLabelByName(name);
    const labelObj = {
      name,
    };
    if (result) {
      labelObj.id = result.id;
    } else {
      const insertResult = await LabelService.create(name);
      labelObj.id = insertResult.insertId;
    }

    newLabels.push(labelObj);
  }

  // 3、将标签信息存储到ctx中
  ctx.labels = newLabels;
  await next();
};
module.exports = {
  verifyLabelIsExist,
};
