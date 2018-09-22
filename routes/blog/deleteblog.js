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
      const res = await models.blog.destroy({
        where: {
          user_id: userId,
          id: blogId,
        },
      });
      if (!res) { reply(Boom.illegal('无法删除')); }
      reply(res);
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
