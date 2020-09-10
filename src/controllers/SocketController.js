const { user } = require('../app/models');

module.exports.respond = async function (socket) {

    const _user = await user.findByPk(socket.decoded.id);
    _user.update({
        id_socket: socket.id
    });

    socket.on('disconnect', data => {

    });
}