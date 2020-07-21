const { user } = require('../app/models');

module.exports.respond = function (socket) {
    
    const { _query } = socket.request;
    if(_query.user_id){
        try {
            const user_id = parseInt(_query.user_id);
            async function setSocketId(){
                const _user = await user.findByPk(user_id);
                _user.update({
                    socket_id: socket.id
                });
            }
            setSocketId();
        } catch (error) {
            
        }
    }

    socket.on('disconnect', data => {
        
    });
}