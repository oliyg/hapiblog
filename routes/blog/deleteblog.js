const { jwtHeaderDefine } = require('../../utils/router-helper');

module.exports = (GROUP_NAME, options) => {
  const { Joi } = options;
  return {
    method: 'DELETE',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      reply();
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
