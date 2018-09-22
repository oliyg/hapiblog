const Joi = require('joi');

const paginationDefine = {
  limit: Joi.number().required().min(1).max(30)
    .description('限制返回的数量，默认 15'),
  page: Joi.number().integer().min(1).description('当前页码，默认 1'),
  pagination: Joi.boolean().description('是否开启分页功能，默认开启'),
};

const jwtHeaderDefine = {
  headers: Joi.object({
    authorization: Joi.string().max(200).required(),
  }).unknown(),
};

module.exports = {
  paginationDefine,
  jwtHeaderDefine,
};
