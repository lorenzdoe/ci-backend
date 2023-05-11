require('dotenv').config({ path: getEnvPath() }); //tells where env variables are
require('express');
const { Sequelize } = require('sequelize');

function getEnvPath() {
    if (process.env.NODE_ENV === 'production') {
      // Load environment variables set by Docker Compose in production
      return '.env';
    } else if (process.env.NODE_ENV === 'circleci') {
      // Load environment variables for CircleCI
      return '.env.circleci';
    } else {
      // Load local environment variables for development
      return '.env.local';
    }
  }

const connUrl =
    process.env.DB_DIALECT + '://' +
    process.env.DB_USER + ':' +
    process.env.DB_PW + '@' +
    process.env.DB_HOST + '/' +
    process.env.DB_NAME;

const db = new Sequelize(connUrl);

const models = [
    require('../models/todo'),
    require('../models/user')
];

for (const model of models) {
    model(db);
}

module.exports = db;
