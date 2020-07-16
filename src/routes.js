const routes = require('express').Router();
// const authMiddleware = require('./middlewares/auth');

const AuthenticationController = require('./controllers/AuthenticationController');
const UserController = require('./controllers/UserController');

// AUTHENTICATION
routes.post('/authentication/login', AuthenticationController.login);

// USER
routes.post('/users', UserController.store);

// routes.use('/users', [ authMiddleware ]); // MIDDLEWARE
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

module.exports = routes;