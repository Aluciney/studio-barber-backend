const { user } = require('../app/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        const users = await user.findAll();
        return res.status(200).json(users);
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const _user = await user.findByPk(id);

            return res.status(200).json(_user);
        } catch (error) {
            return res.status(404).json({ error: `Usuário não encontrado!` });
        }
    },

    async store(req, res) {
        try {
            const { name, email, password, avatar_url } = req.body;
            var password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            const _user = await user.create({
                name,
                email,
                password_hash,
                avatar_url
            });

            var token = jwt.sign({ id: _user.id }, process.env.JWT_SECRET_KEY);

            return res.status(201).json({ user: _user, token: token });
        } catch (error) {
            return res.status(404).json({ error: `Erro ao cadastrar usuario. Erro: ${error}` });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const _user = await user.findByPk(id);
            if (_user) {
                _user.update(req.body);
                return res.json(_user);
            }
            return res.status(404).json({ error: `Usuário não encontrado.` });
        } catch (error) {
            return res.status(404).json({ error: `Erro ao atualizar usuario. Erro: ${error}` });
        }
    },

    async destroy(req, res) {
        try {
            const _user = await user.findByPk(req.res.userId);
            await _user.destroy();
            return res.send();
        } catch (error) {
            return res.status(404).json({ error: `Erro ao deletar usuario. Erro: ${error}` });
        }
    }
};