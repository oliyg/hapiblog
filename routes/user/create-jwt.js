module.exports = (GROUP_NAME, options) => {
  const { JWT } = options;
  return {
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, reply) => {
      // todo
      const generateJWT = jwtInfo => JWT.sign({
        userId: jwtInfo.userId,
      }, process.env.JWT_SECRET, {
        expiresIn: '2day',
        subject: 'blog user token',
      });

      reply(generateJWT({
        userId: 1,
      }));
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建 JWT',
      auth: false,
    },
  };
};
