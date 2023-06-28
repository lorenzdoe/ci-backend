var express = require('express');
var router = express.Router();
const db = require('../db/db');

// read if feature is enabled
router.get('/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const feature = await db.models.feature.findByPk(name);
        if(!feature){
            return res.status(404).json({ errors: 'feature does not exist' });
        }
        res.status(200).json({ 'enabled': feature.enabled });
    }
    catch(err) {
        res.status(500).json({ errors: err });
    }
});

module.exports = router;
