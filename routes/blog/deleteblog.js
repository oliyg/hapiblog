module.exports = (GROUP_NAME, options) => {
  const { Joi } = options;
  return {
    method: 'DELETE',
    path: `/${GROUP_NAME}/{blogId}`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '根据 id 删除博客',
      validate: {
        headers: Joi.object({
          authorization: Joi.string().max(500).required(),
        }).unknown(),
        params: {
          blogId: Joi.number().min(1).required(),
        },
      },
    },
  };
};
