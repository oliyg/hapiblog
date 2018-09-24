const { Op } = require('sequelize');
const redis = require('../../redis');

module.exports = (GROUP_NAME, options) => ({
  method: 'GET',
  path: `/${GROUP_NAME}/tag`,
  handler: async (request, reply) => {
    const { limit, page, tag } = request.query;
    const offset = (page - 1) * limit;

    // redis 缓存
    const { setAsync, getAsync, client } = redis(request);
    const redisResName = `posttag${tag}limit${limit}offset${offset}list`;
    const redisRes = await getAsync(redisResName);
    if (redisRes) {
      reply(JSON.parse(redisRes));
    } else {
      const { rows: results, count: totalCount } = await options.models.blog.findAndCountAll({
        limit,
        offset,
        where: {
          tag: {
            [Op.like]: `%${tag}%`,
          },
        },
        attributes: { exclude: ['updated_at', 'content'] },
      });
      await setAsync(redisResName, JSON.stringify({ results, totalCount }));
      client.EXPIRE(redisResName, 5);
      reply({ results, totalCount });
    }
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '获取文章列表',
    validate: {
      query: {
        ...options.paginationDefine,
        tag: options.Joi.string().max(30).required().description('tag 名称'),
      },
    },
    auth: false,
  },
});
