require('dotenv').config();

const path = require('path');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const routes = require('./routes');
const SocketController = require('./controllers/SocketController');
const app = express();

const errorHandler = require('./errors/handler');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errorHandler.errorHandler);

const server = http.createServer(app);
const io = socketIO(server);

io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
            if (error) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', SocketController.respond);

server.listen(process.env.PORT || 3001);