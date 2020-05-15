import socket from './socket'

export default async (token, username) => new Promise(resolve => {
  socket.once('invite', success => resolve(success))
  socket.emit('invite', { token, username })
})
