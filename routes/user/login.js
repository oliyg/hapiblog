const crypto = require('crypto');

module.exports = (GROUP_NAME, options) => {
  const { JWT, Joi, models } = options;
  return {
    method: 'POST',
    path: `/${GROUP_NAME}/login`,
    handler: async (request, reply) => {
      // 获取凭证
      const { username, passwd } = request.payload.userInfo;
      const encryptedPasswd = crypto.createHmac('sha256', process.env.PASSWD_SECRET).update(passwd).digest('hex');

      // 比对用户信息
      const res = await models.user.findOne({
        where: {
          username,
          passwd: encryptedPasswd,
        },
      });

      // 分配 token
      if (res) {
        const generateJWT = jwtInfo => JWT.sign({
          userId: jwtInfo.userId,
        }, process.env.JWT_SECRET, {
          expiresIn: '2day',
          subject: 'blog user token',
        });
        reply({
          jwt: generateJWT({
            userId: res.id,
          }),
          username,
        });
      } else {
        reply();
      }
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
