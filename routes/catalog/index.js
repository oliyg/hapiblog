const Joi = require('joi');
const { paginationDefine } = require('../../utils/router-helper');
const models = require('../../models');
const getListByTag = require('./getlistbytag');
const getListByTitle = require('./getlistbytitle');
const getListByUserId = require('./getlistbyuserid');

const GROUP_NAME = 'catalog';

module.exports = [
  getListByTag(GROUP_NAME, { Joi, paginationDefine, models }),
  getListByTitle(GROUP_NAME, { Joi, paginationDefine, models }),
  getListByUserId(GROUP_NAME, { Joi, paginationDefine, models }),
];
