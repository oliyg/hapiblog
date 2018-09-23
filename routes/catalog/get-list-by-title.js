const { Op } = require('sequelize');
const redis = require('../../redis');

module.exports = (GROUP_NAME, options) => ({
  method: 'GET',
  path: `/${GROUP_NAME}/title/{title}`,
  handler: async (request, reply) => {
    const { limit, page } = request.query;
    const { title } = request.params;
    const offset = (page - 1) * limit;

    // redis 缓存
    const { client, setAsync, getAsync } = redis(request);
    const redisResName = `postbytitle${title}limit${limit}offset${offset}list`;
    const redisRes = await getAsync(redisResName);
    if (redisRes) {
      reply(JSON.parse(redisRes));
    } else {
      const { rows: results, count: totalCount } = await options.models.blog.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ['updated_at', 'content'] },
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
      });
      await setAsync(redisResName, JSON.stringify({ results, totalCount }));
      client.EXPIRE(redisResName, 5);
      reply({ results, totalCount });
    }
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
