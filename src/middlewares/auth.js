const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema))
        return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).send({ error: 'Token invalid' });

        res.userId = decoded.id;
        return next();
    });
}