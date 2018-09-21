const inert = require('inert');
const vision = require('vision');
const packageInfo = require('package');
const hapiSwagger = require('hapi-swagger');

const swaggerOptions = {
  info: {
    title: '接口文档',
    version: packageInfo.version,
    description: '基于 hapi 框架的博客系统后台',
    contact: {
      name: 'Oliver',
      url: 'https://github.com/oliyg',
      email: 'billyangg@qq.com',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/oliyg/hapiblog/blob/master/LICENSE',
    },
  },
  lang: 'zh-cn',
  grouping: 'tags',
  tags: [
    { name: 'tests', description: '测试相关' },
  ],
};

module.exports = [
  inert,
  vision,
  {
    register: hapiSwagger,
    options: swaggerOptions,
  },
];
