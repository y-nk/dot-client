export default (state, { id, name }) => {
  if (id in state.sessions)
    throw new Error('session already exists')

  const session = {
    id, name,
    heartbeat: Date.now(),
    mode: 'concat', // concat, replace, lock, interrupt, prompt

    data: [],
  }

  state.sessions = {
    ...state.sessions,
    [id]: session
  }
}
