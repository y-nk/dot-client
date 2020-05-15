import wait from '@/wait'

export default async ({ state, commit }, id) => {
  const lines = state.sessions[id].data.length
  
  for (var i = 0; i < lines; i++) {
    commit('scroll', id)
    await wait(375)
  }
}
