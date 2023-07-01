const { body, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();
const db = require('../db/db');

router.post('/',
    body('experiment').not().isEmpty(),
    body('variant').not().isEmpty(),
    body('event').not().isEmpty(),   
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const abTest = await db.models.abTest.create({
                name: req.body.experiment,
                variant: req.body.variant,
                event: req.body.event
            });

            res.status(201).json(abTest);
        } catch (err) {
            res.status(500).json({ errors: err });
        }
    }
);

module.exports = router;