const Joi = require('joi');
const { paginationDefine } = require('../../utils/router-helper');
const models = require('../../models');
const blogList = require('./bloglist');
const newBlog = require('./newblog');
const deleteBlog = require('./deleteblog');

const GROUP_NAME = 'blog';

module.exports = [
  blogList(GROUP_NAME, { paginationDefine, models }),
  newBlog(GROUP_NAME, { Joi, models }),
  deleteBlog(GROUP_NAME, { Joi }),
];
