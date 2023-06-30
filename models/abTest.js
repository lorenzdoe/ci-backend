const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('abTest', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        variant: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: false
        },
        event: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });
};
