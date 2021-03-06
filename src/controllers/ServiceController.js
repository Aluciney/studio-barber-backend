const { service } = require('../app/models');

module.exports = {
    async index(req, res) {
        const services = await service.findAll({ raw: true });
        const new_services = services.map(service_ => {
            return {
                ...service_,
                value: parseFloat(service_.value)
            }
        })
        return res.status(200).json(new_services);
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const _service = await service.findByPk(id,{ raw: true });

            const new_service = {
                ..._service,
                value: parseFloat(_service.value)
            };

            return res.status(200).json(new_service);
        } catch (error) {
            return res.status(404).json({ error: `Serviço não encontrado!` });
        }
    },

    async store(req, res) {
        try {
            const _service_data = req.body;
            
            if(!req.file){
                return res.status(404).json({ error: `Erro ao cadastrar serviço. É obrigatório o envio da imagem.` });
            }

            _service_data.image_url = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

            const _service = await service.create(_service_data);
            const _service_json = _service.toJSON();

            const new_service = {
                ..._service_json,
                value: parseFloat(_service_json.value)
            };

            return res.status(201).json(new_service);
        } catch (error) {
            return res.status(404).json({ error: `Erro ao cadastrar serviço. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const _service = await service.findByPk(id);

            _service.update(req.body);
            const _service_json = _service.toJSON();

            const new_service = {
                ..._service_json,
                value: parseFloat(_service_json.value)
            };

            return res.status(200).json(new_service);
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