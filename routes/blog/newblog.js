module.exports = (GROUP_NAME, options) => {
  const { Joi } = options;
  return {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '新增博客',
      validate: {
        headers: Joi.object({
          authorization: Joi.string().max(500).required(),
        }).unknown(),
        payload: {
        // eg:
        // {
        //   title: 'content title',
        //   author: 'oliver',
        //   tag: ['frot-end', 'database'],
        //   content: '## subtitle > quote',
        // }
          newBlog: Joi.object().keys({
            title: Joi.string().max(50).required(),
            author: Joi.string().max(50).required(),
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
