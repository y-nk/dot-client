export default (state, { id, data, metadata = {} }) => {
  if (!(id in state.sessions))
    throw new Error('unknown session')

  let history = state.sessions[id].data

  if (!data.length)
    history = write(history, data, metadata)
  else
    for (const char of data) {
      if (char === '\b')
        history = rewind(history, state.sessions[id].mode === 'prompt')
      else if (char === '\n')
        history = mark(history)
      else
        history = write(history, char, metadata)
    }

  state.sessions[id].data = history
  state.sessions[id].heartbeat = Date.now()
}

const write = (history, data, metadata = {}) => {
  const chunks = history.pop() ?? []
  const latest = chunks.pop()

  const { author } = metadata
  const patch = latest ? [latest] : []

  if (author === latest?.metadata?.author)
    latest.data += data
  else
    patch.push({ data, metadata })
  
  return [...history, [...chunks, ...patch]]
}

const rewind = (history, locally) => {
  const chunks = history.pop() ?? []
  const latest = chunks.pop()

  if (latest)
    latest.data = latest.data?.slice(0, -1)
  
  if (latest?.data?.length || locally)
    return [...history, [...chunks, latest]]
  else if (!chunks.length)
    return [...history]

  return [...history, chunks]
}

const mark = history => (
  [...history, []]
)
