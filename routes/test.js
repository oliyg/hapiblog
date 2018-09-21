const GROUP_NAME = 'test';

module.exports = [{
  method: 'GET',
  path: `/${GROUP_NAME}`,
  handler: async (request, reply) => {
    reply();
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '测试 GET',
  },
}, {
  method: 'POST',
  path: `/${GROUP_NAME}`,
  handler: async (request, reply) => {
    reply();
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '测试 POST',
  },
}];
