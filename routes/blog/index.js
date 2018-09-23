const Joi = require('joi');
const Boom = require('boom');
const { paginationDefine, blogMetadataDefine } = require('../../utils/router-helper');
const { jwtHeaderDefine } = require('../../utils/router-helper');
const models = require('../../models');
const getList = require('./getlist');
const getDetail = require('./getdetail');
const createBlog = require('./createblog');
const removeBlog = require('./removeblog');
const modifyBlog = require('./modifyblog');

const GROUP_NAME = 'blog';

module.exports = [
  getList(GROUP_NAME, { paginationDefine, models }),
  getDetail(GROUP_NAME, { Joi, models, Boom }),
  createBlog(GROUP_NAME, {
    blogMetadataDefine, jwtHeaderDefine, models,
  }),
  modifyBlog(GROUP_NAME, {
    blogMetadataDefine, jwtHeaderDefine, Joi, models,
  }),
  removeBlog(GROUP_NAME, { jwtHeaderDefine, Joi, models }),
];
