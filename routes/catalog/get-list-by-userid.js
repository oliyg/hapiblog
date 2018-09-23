module.exports = (GROUP_NAME, options) => ({
  method: 'GET',
  path: `/${GROUP_NAME}/author/{userId}`,
  handler: async (request, reply) => {
    const { rows: results, count: totalCount } = await options.models.blog.findAndCountAll({
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit,
      attributes: { exclude: ['updated_at', 'content'] },
      where: {
        user_id: request.params.userId,
      },
    });
    reply({ results, totalCount });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '根据 userId 获取文章列表',
    validate: {
      query: {
        ...options.paginationDefine,
      },
      params: {
        userId: options.Joi.number().max(100).required().description('userId'),
      },
    },
    auth: false,
  },
});
