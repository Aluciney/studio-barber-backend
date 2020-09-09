const { reservation, reservation_time, sequelize } = require('../app/models');

module.exports = {
    async index(req, res) {
        const reservations = await reservation.findAll({ include: [ reservation_time ] });
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
        const transaction = await sequelize.transaction();
        try {
            const { date, note, id_time } = req.body;
            const id_user = req.res.userId;

            const reservations = await reservation.findAll({ 
                where: { date },
                include: [{
                    model: reservation_time,
                    required: true,
                    where: { id_time }
                }] 
            });

            if(reservations.length > 0){
                return res.status(404).json({ error: `Esta data e horário ja encontra-se reservados. Por favor selecione outro horário.` });
            }

            const _reservation = await reservation.create({
                id_user, date, note
            },{ transaction });

            const _reservation_time = await reservation_time.create({
                id_reservation: _reservation.id, 
                id_time
            },{ transaction });

            var reservation_created = {
                ..._reservation.toJSON(),
                reservation_time: _reservation_time
            };
            
            transaction.commit();
            return res.status(201).json(reservation_created);
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