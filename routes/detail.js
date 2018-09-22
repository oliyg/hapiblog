const Joi = require('joi');
const Boom = require('boom');
const models = require('../models');

const GROUP_NAME = 'detail';

module.exports = [{
  method: 'GET',
  path: `/${GROUP_NAME}/{id}/{date}/{title}`, // data 和 title 为 SEO 优化
  handler: async (request, reply) => {
    const { id: blogId } = request.params;
    const res = await models.blog.find({
      where: {
        id: blogId,
      },
    });
    if (!res) {
      reply(Boom.notFound('资源请求失败'));
    }
    const incCount = res.count + 1;
    const newRes = await models.blog.update({ // 观看数量递增
      count: incCount,
    }, {
      where: {
        id: blogId,
      },
    });
    reply(newRes);
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '根据 id 获取文章详情',
    validate: {
      params: {
        date: Joi.string().regex(/^\d{4}-\d{1,2}-\d{1,2}$/).required(), // eg: 2018-12-12 2017-1-1
        title: Joi.string().min(1).required(),
        id: Joi.number().min(1).required(),
      },
    },
    auth: false,
  },
}];
