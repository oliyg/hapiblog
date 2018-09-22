const crypto = require('crypto');

module.exports = (GROUP_NAME, options) => {
  const { JWT, Joi } = options;
  return {
    method: 'POST',
    path: `/${GROUP_NAME}/login`,
    handler: async (request, reply) => {
      const { username, passwd } = request.payload.userInfo;
      const secret = process.env.PASSWD_SECRET;
      const encryptedPasswd = crypto.createHmac('sha256', secret).update(passwd).digest('hex');
      // todo 比对加密后的密码
      console.log({ username, encryptedPasswd, JWT });
      // const generateJWT = jwtInfo => JWT.sign({
      //   userId: jwtInfo.userId,
      // }, process.env.JWT_SECRET, {
      //   expiresIn: '2day',
      //   subject: 'blog user token',
      // });
      // reply(generateJWT({
      //   userId: 1,
      // }));
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '用户登录并创建 JWT',
      validate: {
        payload: {
          userInfo: Joi.object().keys({
            username: Joi.string().max(30).required().description('用户名'),
            passwd: Joi.string().min(8).max(30).required()
              .description('密码'),
          }).required(),
        },
      },
      auth: false,
    },
  };
};
