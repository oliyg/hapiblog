const Boom = require('boom');

module.exports = (GROUP_NAME, options) => {
  const { Joi, models, jwtHeaderDefine } = options;
  return {
    method: 'DELETE',
    path: `/${GROUP_NAME}/{id}`,
    handler: async (request, reply) => {
      const { id: blogId } = request.params;
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
        params: {
          id: Joi.number().min(1).required().description('需要删除的文章 id'),
        },
      },
    },
  };
};
