const { jwtHeaderDefine } = require('../../utils/router-helper');

module.exports = (GROUP_NAME, options) => {
  const { Joi, models } = options;
  return {
    method: 'PUT',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      const { blogId } = request.query;
      const { userId } = request.auth.credentials;
      const {
        title, tag, content, short,
      } = request.payload.modifyBlog;
      const tagStr = tag.join(';');

      const res = await models.blog.update({
        title,
        tag: tagStr,
        content,
        short,
        user_id: userId,
      }, {
        where: {
          user_id: userId,
          id: blogId,
        },
      });
      reply(res);
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '根据 id 修改文章',
      validate: {
        ...jwtHeaderDefine,
        query: {
          blogId: Joi.number().min(1).required(),
        },
        payload: {
          modifyBlog: Joi.object().keys({
            title: Joi.string().max(50).required(),
            tag: Joi.array().sparse(false).items(Joi.string()).unique()
              .max(10)
              .required(),
            content: Joi.string().min(10).max(60000).required(),
            short: Joi.string().min(10).max(1000).required(),
          }).required(),
        },
      },
    },
  };
};
