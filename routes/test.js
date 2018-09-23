const GROUP_NAME = 'test';
const redis = require('../redis');

module.exports = [{
  method: 'GET',
  path: `/${GROUP_NAME}`,
  handler: async (request, reply) => {
    const { client, hgetallAsync, hmsetAsync } = redis(request);

    let res = await hgetallAsync('another');
    if (res) {
      reply(res);
    } else {
      await hmsetAsync('another', {
        name: 'oli',
        age: 18,
        modified: new Date(),
      });
      client.EXPIRE('another', 3);
      res = await hgetallAsync('another');
      reply(res);
    }
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '测试 GET',
    auth: false,
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
    auth: false,
  },
}];
