const { body, validationResult } = require('express-validator');

const db = require('../db/db');

var express = require('express');
var router = express.Router();

/* Read all todos */
router.get('/', async (req, res, next) => {
    res.status(200).json('{\'message\': \'GET, hello from login router\'}');
});

/* Read all todos */
router.post('/',
    body('user').not().isEmpty(),
    body('user').isLength({ max: 255 }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.status(200).json('{\'message\': \'POST, hello from login router\'}');
        
});

// TODO: post put delete

module.exports = router;
