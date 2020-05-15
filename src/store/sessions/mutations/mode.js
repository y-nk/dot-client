export default (state, { id, mode }) => {
  if (!(id in state.sessions))
    throw new Error('unknown session')

  state.sessions[id].mode = mode
}
