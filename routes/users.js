var { body, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();
const db = require('../db/db');

/* create user */
router.post('/',
    body('username').not().isEmpty(),
    body('username').isLength({ max: 255 }),
    body('password').not().isEmpty(),
    body('password').isLength({ min: 5 }),    
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const userExists = await db.models.user.findByPk(req.body.username);
            if(userExists){
                return res.status(400).json({ errors: "Username already exists" });
            }
            const user = await db.models.user.create({
                username: req.body.username,
                password: req.body.password
            });

            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ errors: err });
        }
    }
);

module.exports = router;