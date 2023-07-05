const { DataTypes } = require('sequelize');

// feature toggles
module.exports = (sequelize) => {
    sequelize.define('feature', {
        name: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        enabled: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
};
