module.exports = (GROUP_NAME, options) => {
  const {
    Joi, models, jwtHeaderDefine, blogMetadataDefine,
  } = options;
  return {
    method: 'PUT',
    path: `/${GROUP_NAME}/{id}`,
    handler: async (request, reply) => {
      const { id: blogId } = request.params;
      const { userId } = request.auth.credentials;
      const {
        title, tag, content, short,
      } = request.payload.blogData;
      const tagStr = tag.join(';');

      const res = await models.blog.update({
        title,
        tag: tagStr,
        content,
        short,
        user_id: userId,
      }, {
        where: {
          user_id: userId,
          id: blogId,
        },
      });
      reply(res);
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '根据 id 修改文章',
      validate: {
        ...jwtHeaderDefine,
        params: {
          id: Joi.number().min(1).required(),
        },
        payload: blogMetadataDefine,
      },
    },
  };
};
