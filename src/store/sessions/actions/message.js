import wait from '@/wait'

const delay = char => (
  (char === undefined || char === '\n')
    ? 750
    : 75
)

export default async ({ state, commit }, { id, data }) => {
  if (state.sessions[id].mode === 'lock')
    return

  commit('mode', { id, mode: 'lock' })

  for (var i = 0; i < data.length; i++) {
    commit('concat', {
      id,
      data: data[i],
      metadata: { author: 'system' },
    })

    await wait(delay(data[i + 1]))
    
    if (state.sessions[id].mode === 'interrupt')
      break;
  }

  if (i < data.length - 1)
    commit('concat', {
      id,
      data: data.slice(i + 1),
      metadata: { author: 'system' },
    })

    commit('mode', { id, mode: 'concat' })
}
