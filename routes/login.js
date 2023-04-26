const { body, validationResult } = require('express-validator');

const db = require('../db/db');

var express = require('express')
var router = express.Router();

/* Read all todos */
router.get('/', async (req, res, next) => {
    res.status(200).json("{'message': 'hello from login router'}");
});

// TODO: get put delete

module.exports = router;
