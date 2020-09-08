const { time } = require('../app/models');

module.exports = {
    async index(req, res) {
        const times = await time.findAll();
        return res.status(200).json(times);
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const _time = await time.findByPk(id);

            return res.status(200).json(time);
        } catch (error) {
            return res.status(404).json({ error: `Horário não encontrado!` });
        }
    },

    async store(req, res) {
        try {
            const _time = await time.create(req.body);

            return res.status(201).json(_time);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao cadastrar horário. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const _time = await time.findByPk(id);

            _time.update(req.body);

            return res.status(200).json(_time);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao atualizar horário. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const _time = await time.findByPk(id);
            await _time.destroy();

            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar categoria. Erro: ${error}` });
        }
    }
};