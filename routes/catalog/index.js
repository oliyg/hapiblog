const Joi = require('joi');
const { paginationDefine } = require('../../utils/router-helper');
const models = require('../../models');
const getListByTag = require('./get-list-by-tag');
const getListByTitle = require('./get-list-by-title');
const getListByUserId = require('./get-list-by-userid');

const GROUP_NAME = 'catalog';

module.exports = [
  getListByTag(GROUP_NAME, { Joi, paginationDefine, models }),
  getListByTitle(GROUP_NAME, { Joi, paginationDefine, models }),
  getListByUserId(GROUP_NAME, { Joi, paginationDefine, models }),
];
