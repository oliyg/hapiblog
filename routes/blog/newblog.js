const { jwtHeaderDefine } = require('../../utils/router-helper');

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
      description: '新增文章',
      validate: {
        ...jwtHeaderDefine,
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
            user_id: Joi.number().min(1).required(),
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
