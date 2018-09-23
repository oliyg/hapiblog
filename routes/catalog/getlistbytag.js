const { Op } = require('sequelize');

module.exports = (GROUP_NAME, options) => ({
  method: 'GET',
  path: `/${GROUP_NAME}/tag/{tag}`,
  handler: async (request, reply) => {
    // query: limit, page, pagination
    const { rows: results, count: totalCount } = await options.models.blog.findAndCountAll({
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit,
      attributes: { exclude: ['updated_at', 'content'] },
      where: {
        tag: {
          [Op.like]: `%${request.query.tag}%`,
        },
      },
    });
    reply({ results, totalCount });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '根据 tag 获取文章列表',
    validate: {
      query: {
        ...options.paginationDefine,
      },
      params: {
        tag: options.Joi.string().max(30).required().description('tag 名称'),
      },
    },
    auth: false,
  },
});
