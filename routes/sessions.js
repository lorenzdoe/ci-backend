var express = require('express');
var { body, validationResult } = require('express-validator');
const db = require('../db/db');
const { generateAccessToken } = require('../middlewares/auth');
var router = express.Router();

router.post('/',
    body('username').not().isEmpty(),
    body('password').not().isEmpty(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const findUser = await db.models.user.findByPk(req.body.username);
            if(!findUser || findUser.password != req.body.password){
                return res.status(401).json({ errors: 'Username or password is incorrect' });
            }
            // generate jwt token
            const token = generateAccessToken({ username: req.body.username });
            res.status(200).json({ 'token': token });
        } catch (err) {
            res.status(500).json({ errors: err });
        }
    }
);

module.exports = router;
