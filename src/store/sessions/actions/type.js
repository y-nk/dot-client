export default ({ state, commit, getters, rootState }, { data, ime }) => {
  const id = getters.active

  if (state.sessions[id].mode === 'lock')
    return commit('mode', { id, mode: 'interrupt' })

  const author = rootState.api.username ?? '~rainbow~'
  const metadata = { author }

  const action = ime ? 'replace' : 'concat'
  commit(action, { id, data, metadata })
}
