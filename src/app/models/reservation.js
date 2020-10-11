'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        static associate(models) {
            models.reservation.hasMany(models.reservation_service_time,
                { foreignKey: 'id_reservation', }
            );
        }
    };
    Reservation.init({
        id_user: DataTypes.INTEGER,
        date: DataTypes.DATE,
        note: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'reservation',
    });
    return Reservation;
};