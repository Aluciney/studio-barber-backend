const { user } = require('../app/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Yup = require('yup');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        const data = { email, password };

        const schema = Yup.object().shape({
            email: Yup.string().email('Informe um email válido.').required('Email é um campo obrigatório.'),
            password: Yup.string().required('Senha é um campo obrigatório.'),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const _user = await user.findOne({ 
            where: { email },
        });
        
        if(!_user){
            return res.status(401).json({ message: 'E-mail não cadastrado' });
        }

        const compareHash = await bcrypt.compare(password, _user.password_hash);
        if(!compareHash){
            return res.status(401).json({ message: 'Senha inválida' });
        }

        const token = jwt.sign({ id: _user.id }, process.env.JWT_SECRET_KEY);

        return res.status(200).json({ user: _user, token });
    },
    async login_google(req, res) {
        try {
            const { name, email, password, avatar_url } = req.body;

            let user_ = await user.findOne({ 
                where: { email },
            });
            
            if(!user_){
                var password_hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                user_ = await user.create({
                    name,
                    email,
                    password_hash,
                    avatar_url
                });
            }

            var token = jwt.sign({ id: user_.id }, process.env.JWT_SECRET_KEY);

            return res.status(200).json({ user: user_, token });
        } catch (error) {
            return res.status(404).json({ message: `Erro ao fazer login. Erro: ${error}` });
        }
    },
};