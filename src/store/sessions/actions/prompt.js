import store from '@/store'

export default async ({ state, commit, getters }) => {
  const id = getters.active

  const expr = () => {
    const rows = state.sessions[id].data
    return rows[rows.length - 1]
  }

  commit('mode', { id, mode: 'prompt' })
  commit('concat', { id, data: '' })
  
  return new Promise(resolve => {
    const unwatch = store.watch(expr, val => {
      if (val.length !== 0)
        return
  
      const latest = state.sessions[id].data
        .concat()
        .reverse()
        .find(row => row.length)
  
      const { data } = latest[latest.length - 1]

      unwatch()
      resolve(data)
      commit('mode', { id, mode: 'unlock' })
    })
  })
}
