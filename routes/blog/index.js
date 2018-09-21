const Joi = require('joi');
const { paginationDefine } = require('../../utils/router-helper');
const modules = require('../../models');
const blogList = require('./bloglist');
const newBlog = require('./newblog');
const deleteBlog = require('./deleteblog');

const GROUP_NAME = 'blog';

module.exports = [
  blogList(GROUP_NAME, { paginationDefine, modules }),
  newBlog(GROUP_NAME, { Joi, modules }),
  deleteBlog(GROUP_NAME, { Joi }),
];
