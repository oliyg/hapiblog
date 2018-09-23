const Joi = require('joi');
const { Op } = require('sequelize');
const { paginationDefine } = require('../../utils/router-helper');
const models = require('../../models');
const getListTop = require('./get-list-top');

const GROUP_NAME = 'suggest';

module.exports = [
  getListTop(GROUP_NAME, {
    Joi, Op, paginationDefine, models,
  }),
];
