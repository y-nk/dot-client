import socket from './socket'

export default async (token, room, data) => {
  socket.emit('tx', { ...data, room, token })
}
