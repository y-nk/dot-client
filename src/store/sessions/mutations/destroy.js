export default (state, id) => {
  if (!(id in state.sessions))
    throw new Error('unknown session')

  const { [id]: omit, ...sessions } = state.sessions
  state.sessions = sessions

  if (state.active === id)
    state.active = Object.keys(state.sessions).shift()
}
