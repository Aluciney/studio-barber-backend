const { reservation } = require('../app/models');

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
        try {
            const _reservation = await reservation.create(req.body);

            return res.status(201).json(_reservation);
        } catch (error) {
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