const { body, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();
const db = require('../db/db');


/* Read all todos */
router.get('/', async (req, res) => {
    const username = req.body.username;
    const todos = await db.models.todo.findAll({
        where: {username}
    });
    res.status(200).json(todos);
});

/* Create todos */
router.post('/',
    body('name').not().isEmpty(),
    body('name').isLength({ max: 255 }),
    body('username').not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const todo = await db.models.todo.create({
            name: req.body.name,
            username: req.body.username
        });

        res.status(201).json(todo);
});

/* Update todos with done */
router.put('/:id/done',
    async (req, res) => {
        const pk = req.params.id;
        var todo = await db.models.todo.findByPk(pk);

        if (null == todo) {
            res.status(404);
            return;
        }

        // forbidden
        else if(todo.username != req.body.username) {
            res.status(403);
            return;
        }
        

        todo = await todo.update({ done: true });

        res.status(200).json(todo);
});

/* Update todos with undone */
router.delete('/:id/done',
    async (req, res) => {
        const pk = req.params.id;
        var todo = await db.models.todo.findByPk(pk);

        if (null == todo) {
            res.status(404);
            return;
        }

        // forbidden
        else if(todo.username != req.body.username) {
            res.status(403);
            return;
        }

        todo = await todo.update({ done: false });

        res.status(200).json(todo);
});

module.exports = router;
