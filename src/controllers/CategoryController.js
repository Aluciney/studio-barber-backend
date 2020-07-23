const { category } = require('../app/models');

module.exports = {
    async index(req, res) {
        const categories = await category.findAll();
        return res.status(200).json(categories);
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const _category = await category.findByPk(id);

            return res.status(200).json(_category);
        } catch (error) {
            return res.status(404).json({ error: `Categoria não encontrada!` });
        }
    },

    async store(req, res) {
        try {
            const _category = await category.create(req.body);

            return res.status(201).json(_category);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao cadastrar categoria. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const _category = await category.findByPk(id);

            _category.update(req.body);

            return res.status(200).json(_category);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao atualizar categoria. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const _category = await category.findByPk(id);
            await _category.destroy();

            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar categoria. Erro: ${error}` });
        }
    }
};