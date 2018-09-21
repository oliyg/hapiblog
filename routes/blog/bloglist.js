module.exports = (GROUP_NAME, options) => ({
  method: 'GET',
  path: `/${GROUP_NAME}`,
  handler: async (request, reply) => {
    // query: limit, page, pagination
    const { rows: results, count: totalCount } = await options.modules.blog.findAndCountAll({
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit,
      attributes: { exclude: ['updated_at'] },
    });
    reply({ results, totalCount });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '获取博客列表',
    validate: {
      query: {
        ...options.paginationDefine,
      },
    },
  },
});
