const Joi = require('joi');
const JWT = require('jsonwebtoken');
const models = require('../../models');
const login = require('./login');

const GROUP_NAME = 'user';

module.exports = [
  login(GROUP_NAME, { JWT, Joi, models }),
];
