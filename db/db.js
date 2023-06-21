require('dotenv').config({ path: getEnvPath() }); //tells where env variables are
require('express');
const { Sequelize } = require('sequelize');

function getEnvPath() {
    switch(process.env.NODE_ENV) {
        case 'production':
            return '/app/.env';
        case 'circleci':
            return '.env.circleci';
        default:
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
