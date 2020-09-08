const { reservation, reservation_time } = require('../app/models');

const Sequelize = require('sequelize')

module.exports = {
    async index(req, res) {
        const reservations = await reservation.findAll();
        return res.status(200).json(reservations);
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const _reservation = await reservation.findByPk(id);

            return res.status(200).json(_reservation);
        } catch (error) {
            return res.status(404).json({ error: `Reserva não encontrada!` });
        }
    },

    async store(req, res) {
        const transaction = Sequelize.Transaction();
        try {
            const { date, note, time } = req.body;

            const reservations = await reservation.findAll({ 
                where: { date },
                include: [ reservation_time ] 
            });

            if(reservations.length > 0){
                return res.status(404).json({ error: `Esta ` });
            }

            const _reservation = await reservation.create(req.body,{ transaction });

            
            transaction.commit();
            return res.status(201).json(_reservation);
        } catch (error) {
            transaction.rollback();
            return res.status(404).json({ error: `Erro ao cadastrar reserva. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const _reservation = await reservation.findByPk(id);

            _reservation.update(req.body);

            return res.status(200).json(_reservation);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao atualizar reserva. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const _reservation = await reservation.findByPk(id);
            await _reservation.destroy();

            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar reserva. Erro: ${error}` });
        }
    }
};