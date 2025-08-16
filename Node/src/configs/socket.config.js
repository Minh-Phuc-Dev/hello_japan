const socketIo = require('socket.io');

class SocketServer {
    static io = socketIo(
        {
            path: "/chat",
            cors: {
                origin: "*",
                methods: "*"
            },
            pingInterval: 2500,
            pingTimeout: 2500
        }
    )
}

module.exports = SocketServer