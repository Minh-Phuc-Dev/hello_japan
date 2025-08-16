require('module-alias/register')
require('dotenv').config()
require("@src/socket")
const app = require('@src/app')


const { APP_PORT } = require('@configs/app.config')
const SocketServer = require('@configs/socket.config')

const server = app.listen(
    APP_PORT,
    () => {
        console.log(`Server start at: ${APP_PORT}`)
    }
)

SocketServer.io.attach(server)
console.info(`Socket server start at: ${SocketServer.io}`)
