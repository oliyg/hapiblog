const redis = require('../../redis');

module.exports = (GROUP_NAME, options) => {
  const { Joi, Op, models } = options;
  return {
    method: 'GET',
    path: `/${GROUP_NAME}/top`,
    handler: async (request, reply) => {
      const { range, limit } = request.query;
      const { client, setAsync, getAsync } = redis(request);

      // 缓存结果
      const redisRes = await getAsync(`top${range}list`);

      if (redisRes) {
        reply(JSON.parse(redisRes));
      } else {
        const findOpts = {
          limit,
          order: [['count', 'DESC']],
        };
        if (range) {
          findOpts.where = {
            created_at: {
              [Op.gte]: new Date(new Date().setDate(new Date().getDate() - (range + 1))),
            },
          };
        }
        const res = await models.blog.findAll(findOpts);
        await setAsync(`top${range}list`, JSON.stringify(res));
        client.EXPIRE(`top${range}list`, 1000 * 60 * 60);
        reply(res);
      }
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取阅读数量 TOP 排名',
      validate: {
        query: {
          limit: Joi.number().min(1).max(10).required()
            .description('排名名次限制'),
          range: Joi.number().min(1).max(30).required()
            .description('指定是几天前内的文章，默认不指定为历史最热'),
        },
      },
      auth: false,
    },
  };
};
