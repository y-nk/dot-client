import { uuid } from 'uuidv4'

export default ({ commit }, { name }) => {
  const id = uuid()
  commit('create', { id, name })
  return id
}
