var env_path = process.env.CIRCLECI === 'true' ? '.env.circleci' : '.env.local';
require('dotenv').config({ path: env_path }); //tells where env variables are
require('express');
// ORM (Object-Relational Mapping) tool
const { Sequelize } = require('sequelize');

const connUrl =
    process.env.DB_DIALECT + '://' +
    process.env.DB_USER + ':' +
    process.env.DB_PW + '@' +
    process.env.DB_HOST + '/' +
    process.env.DB_NAME;

console.log(connUrl);
const db = new Sequelize(connUrl);


const models = [
    require('../models/todo'),
    require('../models/user')
];

for (const model of models) {
    model(db);
}

module.exports = db;
