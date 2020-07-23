const routes = require('express').Router();
const authMiddleware = require('./middlewares/auth');
const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const AuthenticationController = require('./controllers/AuthenticationController');
const UserController = require('./controllers/UserController');
const ServiceController = require('./controllers/ServiceController');
const CategoryController = require('./controllers/CategoryController');
const ReservationController = require('./controllers/ReservationController');

// AUTHENTICATION
routes.post('/authentication/login', AuthenticationController.login);

// USER
routes.post('/users', UserController.store);

routes.use('/users', [ authMiddleware ]); // MIDDLEWARE
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', upload.single('avatar_url'), UserController.update);
routes.delete('/users/:id', UserController.destroy);

// SERVICE
routes.post('/services', ServiceController.store);

routes.use('/services', [ authMiddleware ]); // MIDDLEWARE
routes.get('/services', ServiceController.index);
routes.get('/services/:id', ServiceController.show);
routes.put('/services/:id', ServiceController.update);
routes.delete('/services/:id', ServiceController.destroy);

// CATEGORY
routes.post('/categories', CategoryController.store);

routes.use('/categories', [ authMiddleware ]); // MIDDLEWARE
routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.show);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.destroy);

// CATEGORY
routes.post('/reservations', ReservationController.store);

routes.use('/reservations', [ authMiddleware ]); // MIDDLEWARE
routes.get('/reservations', ReservationController.index);
routes.get('/reservations/:id', ReservationController.show);
routes.put('/reservations/:id', ReservationController.update);
routes.delete('/reservations/:id', ReservationController.destroy);

module.exports = routes;