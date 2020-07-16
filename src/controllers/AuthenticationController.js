const { user } = require('../app/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        const _user = await user.findOne({ 
            where: { email },
        });
        
        if(!_user){
            return res.status(401).json({ error: 'E-mail não cadastrado' });
        }

        const compareHash = await bcrypt.compare(password, _user.password_hash);
        if(!compareHash){
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign({ id: _user.id }, process.env.JWT_SECRET_KEY);

        return res.status(200).json({ user: _user, token });
    },
};