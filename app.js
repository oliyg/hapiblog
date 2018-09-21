const Hapi = require('hapi');
const routesHelloHapi = require('./routes/hello-hapi');
const routesTest = require('./routes/test');
const routesBlog = require('./routes/blog');
const routesDetail = require('./routes/detail');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
require('env2')('./.env');

const { env } = process;

const server = new Hapi.Server();
server.connection({
  host: env.HOST,
  port: env.PORT,
});

const start = async () => {
  // 注册插件
  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination,
  ]);
  // 注册路由
  server.route([
    ...routesTest,
    ...routesHelloHapi,
    ...routesBlog,
    ...routesDetail,
  ]);
  await server.start();
  console.log(`Server running at:${server.info.uri}`); // eslint-disable-line no-console
};

start();
