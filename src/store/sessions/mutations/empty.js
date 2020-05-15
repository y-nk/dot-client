export default (state, id) => {
  if (!(id in state.sessions))
    throw new Error('unknown session')

  state.sessions[id].data = []
}
