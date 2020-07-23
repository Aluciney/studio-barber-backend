const { service } = require('../app/models');

module.exports = {
    async index(req, res) {
        const services = await service.findAll();
        return res.status(200).json(services);
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const _service = await service.findByPk(id);

            return res.status(200).json(_service);
        } catch (error) {
            return res.status(404).json({ error: `Serviço não encontrado!` });
        }
    },

    async store(req, res) {
        try {
            const _service = await service.create(req.body);

            return res.status(201).json(_service);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao cadastrar serviço. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const _service = await service.findByPk(id);

            _service.update(req.body);

            return res.status(200).json(_service);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao atualizar serviço. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const _service = await service.findByPk(id);
            await _service.destroy();

            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar serviço. Erro: ${error}` });
        }
    }
};