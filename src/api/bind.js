import socket from './socket'

export default async (token) => new Promise(resolve => {
  socket.once('bound', success => resolve(success))
  socket.emit('bind', { token })
})
