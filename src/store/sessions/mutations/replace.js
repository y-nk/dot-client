export default (state, { id, data, metadata = {} }) => {
  if (!(id in state.sessions))
    throw new Error('unknown session')

  const { original, replacement } = data

  let history = state.sessions[id].data

  const chunks = history.pop() ?? []
  const chunk  = chunks.pop()

  const { author } = metadata
  const patch = chunk ? [chunk] : []

  if (!chunk || author !== chunk?.metadata?.author)
    patch.push({ data: '', metadata })
  
  const latest = patch[patch.length - 1]  

  if (!original.length)
    latest.data += replacement
  else {
    const index = latest.data.lastIndexOf(original)
    latest.data = `${latest.data.slice(0, index)}${replacement}`
  }
  
  state.sessions[id].data = [...history, [...chunks, ...patch]]
}
