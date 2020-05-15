export default ({ commit, getters }, mode) => {
  const id = getters.active
  commit('mode', { id, mode })
}
