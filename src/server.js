require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const routes = require('./routes');
const SocketController = require('./controllers/SocketController');
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', SocketController.respond );

server.listen(process.env.PORT || 3001);