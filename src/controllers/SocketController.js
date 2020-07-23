const { user } = require('../app/models');

module.exports.respond = function (socket) {
    
    const { _query } = socket.request;
    if(_query.id_user){
        try {
            const id_user = parseInt(_query.id_user);
            async function setSocketId(){
                const _user = await user.findByPk(id_user);
                _user.update({
                    id_socket: socket.id
                });
            }
            setSocketId();
        } catch (error) {
            
        }
    }

    socket.on('disconnect', data => {
        
    });
}