'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TimeDateDisabled extends Model {
        static associate(models) {
            models.time_date_disabled.belongsTo(models.time,
                { foreignKey: 'id_time' }
            );
        }
    };
    TimeDateDisabled.init({
        id_time: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
    }, {
        sequelize,
        modelName: 'time_date_disabled',
    });
    return TimeDateDisabled;
};