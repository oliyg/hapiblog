const Hapi = require('hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const routesTest = require('./routes/test');
const routesBlog = require('./routes/blog');
const routesUser = require('./routes/user');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
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
    hapiAuthJWT2,
    ...pluginHapiSwagger,
    pluginHapiPagination,
  ]);
  pluginHapiAuthJWT2(server);
  // 注册路由
  server.route([
    ...routesTest,
    ...routesBlog,
    ...routesUser,
  ]);
  await server.start();
  console.log(`Server running at:${server.info.uri}`); // eslint-disable-line no-console
};

start();
