'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        name: DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        password_hash: DataTypes.STRING,
        avatar_url: DataTypes.STRING,
        id_expo: DataTypes.STRING,
        id_socket: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'user',
    });
    return User;
};