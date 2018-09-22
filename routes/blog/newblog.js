const { jwtHeaderDefine } = require('../../utils/router-helper');

module.exports = (GROUP_NAME, options) => {
  const { Joi, models } = options;
  return {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      // 接收参数
      const { userId } = request.auth.credentials;
      const { title, tag, content } = request.payload.newBlog;
      const tagStr = tag.join(';');

      // 如果标题、作者以及创建日期都重复则拒绝提交
      const res = await models.blog.create({
        title, tag: tagStr, user_id: userId, content,
      });
      res.save();
      reply(res);
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '新增文章',
      validate: {
        ...jwtHeaderDefine,
        payload: {
          newBlog: Joi.object().keys({
            title: Joi.string().max(50).required(),
            tag: Joi.array().sparse(false).items(Joi.string()).unique()
              .max(10)
              .required(),
            content: Joi.string().min(10).max(60000).required(),
          }).required(),
        },
      },
    },
  };
};
