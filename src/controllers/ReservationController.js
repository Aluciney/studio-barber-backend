const { reservation, reservation_service_time, service, time, sequelize } = require('../app/models');

module.exports = {
    async index(req, res) {
        const reservations = await reservation.findAll({ 
            attributes: ['id', 'date','note'],
            include: [{
                model: reservation_service_time,
                required: true,
                attributes: ['id'],
                include: [
                    {
                        model: service,
                        required: true,
                        attributes: ['id', 'name','image_url', 'value']
                    },{
                        model: time,
                        required: true,
                        attributes: ['id', 'time']
                    }
                ]
            }],
            where: [ req.query ]
        });
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
            const { date, note, id_time, id_services } = req.body;
            const id_user = req.res.userId;

            const reservations = await reservation.findAll({ 
                where: { date },
                include: [{
                    model: reservation_service_time,
                    required: true,
                    where: { id_time }
                }],
                raw: true
            });

            if(reservations.length > 0){
                return res.status(404).json({ error: `Esta data e horário ja encontra-se reservados. Por favor selecione outro horário.` });
            }

            if(id_services.length > 1){
                var reserved_time = false;
                for(var i = 0; i < id_services.length; i++){
                    const _time = await time.findByPk(id_time + i, { raw: true });
                    if(_time){
                        const reservations = await reservation.findAll({ 
                            where: { date },
                            include: [{
                                model: reservation_service_time,
                                required: true,
                                where: { id_time: id_time + i }
                            }],
                            raw: true 
                        });
                        if(reservations.length > 0){
                            reserved_time = true;
                        }
                    }else{
                        reserved_time = true;
                    }
                }
                if(reserved_time){
                    return res.status(404).json({ error: `Não possui horário disponível para todos os serviços. Selecione outro horário.` });
                }
            }

            const _reservation = await reservation.create({
                id_user, date, note
            },{ transaction });

            for(var i = 0; i < id_services.length; i++){
                await reservation_service_time.create({
                    id_reservation: _reservation.id, 
                    id_service: id_services[i],
                    id_time: id_time + i
                },{ transaction });
            }

            const time_ = await time.findByPk(id_time,{ transaction });

            var reservation_created = {
                ..._reservation.toJSON(),
                time: time_
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