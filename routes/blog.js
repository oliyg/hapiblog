const Joi = require('joi');
const modules = require('../models');

const GROUP_NAME = 'blog';

module.exports = [{
  method: 'GET',
  path: `/${GROUP_NAME}`,
  handler: async (request, reply) => {
    const res = await modules.blog.findAll({ attributes: { exclude: ['updated_at'] } });
    reply(res);
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '获取博客列表',
  },
}, {
  method: 'POST',
  path: `/${GROUP_NAME}`,
  handler: async (request, reply) => {
    reply();
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '新增博客',
    validate: {
      headers: Joi.object({
        authorization: Joi.string().max(500).required(),
      }).unknown(),
      payload: {
        // eg:
        // {
        //   title: 'content title',
        //   author: 'oliver',
        //   tag: ['frot-end', 'database'],
        //   content: '## subtitle > quote',
        // }
        newBlog: Joi.object().keys({
          title: Joi.string().max(50).required(),
          author: Joi.string().max(50).required(),
          tag: Joi.array().sparse(false).items(Joi.string()).unique()
            .max(10)
            .required(),
          content: Joi.string().min(10).max(60000).required(),
        }).required(),
      },
    },
  },
}, {
  method: 'DELETE',
  path: `/${GROUP_NAME}/{blogId}`,
  handler: async (request, reply) => {
    reply();
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '根据 id 删除博客',
    validate: {
      headers: Joi.object({
        authorization: Joi.string().max(500).required(),
      }).unknown(),
      params: {
        blogId: Joi.number().min(1).required(),
      },
    },
  },
}];
