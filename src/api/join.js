import socket from './socket'

export default async (token, room) => new Promise(resolve => {
  socket.once('join', success => resolve(success))
  socket.emit('join', { token, room })
})
