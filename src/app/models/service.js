'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Service.init({
        name: DataTypes.STRING(50),
        image_url: DataTypes.STRING,
        value: DataTypes.DECIMAL(10,2),
        active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'service',
    });
    return Service;
};