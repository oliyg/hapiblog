const Joi = require('joi');
const Boom = require('boom');
const models = require('../models');

const GROUP_NAME = 'detail';

module.exports = [{
  method: 'GET',
  path: `/${GROUP_NAME}/{date}/{title}/{id}`, // data 和 title 为 SEO 优化
  handler: async (request, reply) => {
    const { id: blogId } = request.params;
    const res = await models.blog.findOne({
      where: {
        id: blogId,
      },
    });
    if (!res) {
      reply(Boom.notFound('资源请求失败'));
    }
    reply(res);
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
