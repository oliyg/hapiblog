const redis = require('../../redis');

module.exports = (GROUP_NAME, options) => ({
  method: 'GET',
  path: `/${GROUP_NAME}/author`,
  handler: async (request, reply) => {
    const { limit, page, userId } = request.query;
    const offset = (page - 1) * limit;

    // redis 缓存
    const { client, getAsync, setAsync } = redis(request);
    const redisResName = `postbyuserid${userId}limit${limit}offset${offset}list`;
    const redisRes = await getAsync(redisResName);
    if (redisRes) {
      reply(JSON.parse(redisRes));
    } else {
      const { rows: results, count: totalCount } = await options.models.blog.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ['updated_at', 'content'] },
        where: {
          user_id: userId,
        },
      });
      await setAsync(redisResName, JSON.stringify({ results, totalCount }));
      client.EXPIRE(redisResName, 5);
      reply({ results, totalCount });
    }
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '根据 userId 获取文章列表',
    validate: {
      query: {
        ...options.paginationDefine,
        userId: options.Joi.number().min(1).required().description('userId'),
      },
    },
    auth: false,
  },
});
