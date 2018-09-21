const Joi = require('joi');

const GROUP_NAME = 'detail';

module.exports = [{
  method: 'GET',
  path: `/${GROUP_NAME}/{date}/{title}`,
  handler: async (request, reply) => {
    reply([request.params.date, request.params.title]);
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '根据日期和标题获取博客内容',
    validate: {
      params: {
        date: Joi.string().regex(/^\d{4}-\d{1,2}-\d{1,2}$/).required(), // eg: 2018-12-12 2017-1-1
        title: Joi.string().min(1).required(),
      },
    },
  },
}];
