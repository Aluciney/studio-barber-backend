'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('reservation_service_time', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_reservation: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'reservation',
                    key: 'id',
                }
            },
            id_service: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'service',
                    key: 'id',
                }
            },
            id_time: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: 'time',
                    key: 'id',
                }
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('reservation_service_time');
    }
};