export default (state, id) => {
  if (!(id in state.sessions))
    throw new Error('unknown session')

  const [_, ...history] = state.sessions[id].data
  state.sessions[id].data = history
}
