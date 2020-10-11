'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReservationServiceTime extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.reservation_service_time.belongsTo(models.reservation,
                { foreignKey: 'id_reservation' }
            );
            models.reservation_service_time.belongsTo(models.service,
                { foreignKey: 'id_service' }
            );
            models.reservation_service_time.belongsTo(models.time,
                { foreignKey: 'id_time' }
            );
        }
    };
    ReservationServiceTime.init({
        id_reservation: DataTypes.INTEGER,
        id_service: DataTypes.INTEGER,
        id_time: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'reservation_service_time',
    });
    return ReservationServiceTime;
};