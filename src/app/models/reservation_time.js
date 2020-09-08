'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReservationTime extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.reservation_time.belongsTo(models.reservation,
                { foreignKey: 'id_reservation' }
            );
            models.reservation_time.belongsTo(models.time,
                { foreignKey: 'id_time' }
            );
        }
    };
    ReservationTime.init({
        id_reservation: DataTypes.INTEGER,
        id_time: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'reservation_time',
    });
    return ReservationTime;
};