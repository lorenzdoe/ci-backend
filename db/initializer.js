const db = require('./db');

const initializeDb = async function() {

    // find admin user
    if(!(await db.models.user.findByPk('admin'))){
        // create admin user
        await db.models.user.create({
            username: 'admin',
            password: 'root'
        });
    }

    // find feature Toggle
    if(!(await db.models.feature.findByPk('sortTodos'))){
        // create feature toggle
        await db.models.feature.create({
            name: 'sortTodos',
            enabled: true
        });
    }

};

module.exports = { initializeDb };