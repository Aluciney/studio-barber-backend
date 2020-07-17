const routes = require('express').Router();
const authMiddleware = require('./middlewares/auth');
const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const AuthenticationController = require('./controllers/AuthenticationController');
const UserController = require('./controllers/UserController');

// AUTHENTICATION
routes.post('/authentication/login', AuthenticationController.login);

// USER
routes.post('/users', UserController.store);

// routes.use('/users', [ authMiddleware ]); // MIDDLEWARE
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', upload.single('avatar_url'), UserController.update);
routes.delete('/users/:id', UserController.destroy);

module.exports = routes;