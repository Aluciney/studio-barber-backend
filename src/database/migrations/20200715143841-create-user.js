'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(100)
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(100)
            },
            password_hash: {
                allowNull: false,
                type: Sequelize.STRING
            },
            avatar_url: {
                allowNull: true,
                type: Sequelize.STRING
            },
            id_expo: {
                allowNull: true,
                type: Sequelize.STRING
            },
            id_socket: {
                allowNull: true,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user');
    }
};