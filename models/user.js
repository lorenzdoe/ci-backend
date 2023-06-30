const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        username: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: false
        },
        test_group: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });
};