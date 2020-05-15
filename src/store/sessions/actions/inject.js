export default ({ state, commit, dispatch, getters }, { id, data, ime, metadata }) => {
  if (state.sessions[id].mode === 'lock')
    return
  
  const trail = getters.trail?.metadata ?? metadata

  if (metadata.author !== trail.author)
    dispatch('api/break', null, { root: true })

  const action = ime ? 'replace' : 'concat'
  commit(action, { id, data, metadata })
}
