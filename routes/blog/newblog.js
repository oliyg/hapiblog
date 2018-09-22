const dayjs = require('dayjs');
const Boom = require('boom');

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
      const res = await models.blog.findOne({
        where: {
          user_id: userId,
          title,
        },
      });
      if (!res) {
        const newRes = await models.blog.create({
          title,
          tag: tagStr,
          content,
          user_id: userId,
        });
        reply(newRes);
      }
      if (dayjs(res.created_at).format('YYYY-MM-DD') === dayjs(new Date()).format('YYYY-MM-DD')) {
        reply(Boom.conflict('今日已发送此篇文章，请修改内容后重试'));
      }
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
