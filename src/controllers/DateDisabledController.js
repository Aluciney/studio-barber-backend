const { date_disabled } = require('../app/models');

module.exports = {
    async index(req, res) {
        const dates_disabled = await date_disabled.findAll();
        return res.status(200).json(dates_disabled);
    },

    async store(req, res) {
        try {
            const _date_disabled = await date_disabled.create(req.body);

            return res.status(201).json(_date_disabled);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao cadastrar data desativada. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const _date_disabled = await date_disabled.findByPk(id);
            await _date_disabled.destroy();

            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar data desativada. Erro: ${error}` });
        }
    }
};