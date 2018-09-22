const Joi = require('joi');
const JWT = require('jsonwebtoken');
const createJWT = require('./create-jwt');

const GROUP_NAME = 'user';

module.exports = [
  createJWT(GROUP_NAME, { Joi, JWT }),
];
