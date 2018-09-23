const { Op } = require('sequelize');

module.exports = (GROUP_NAME, options) => ({
  method: 'GET',
  path: `/${GROUP_NAME}/title/{title}`,
  handler: async (request, reply) => {
    const { rows: results, count: totalCount } = await options.models.blog.findAndCountAll({
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit,
      attributes: { exclude: ['updated_at', 'content'] },
      where: {
        title: {
          [Op.like]: `%${request.params.title}%`,
        },
      },
    });
    reply({ results, totalCount });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '根据 title 获取文章列表',
    validate: {
      query: {
        ...options.paginationDefine,
      },
      params: {
        title: options.Joi.string().max(100).required().description('title 名称'),
      },
    },
    auth: false,
  },
});
