const Boom = require('boom');
const { jwtHeaderDefine } = require('../../utils/router-helper');

module.exports = (GROUP_NAME, options) => {
  const { Joi, models } = options;
  return {
    method: 'DELETE',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      const { blogId } = request.query;
      const { userId } = request.auth.credentials;
      const res = await models.blog.findOne({
        where: {
          user_id: userId,
          id: blogId,
        },
      });
      if (!res) {
        reply(Boom.illegal('您无权删除其他人的文章'));
      }
      const newRes = await models.blog.destroy({
        where: {
          user_id: userId,
          id: blogId,
        },
      });
      reply(newRes);
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '根据 id 删除文章',
      validate: {
        ...jwtHeaderDefine,
        query: {
          blogId: Joi.number().min(1).required(),
        },
      },
    },
  };
};
