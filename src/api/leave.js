import socket from './socket'

export default async (token, room) => (
  socket.emit('leave', { token, room })
)
