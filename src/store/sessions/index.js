import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,

  state: {
    sessions: {},
    active: undefined,
  },
  
  actions,
  mutations,

  getters: {
    // binding to all sessions
    sessions: state => Object.values(state.sessions),

    // connection with vuex-router-sync
    active: (_, { sessions }, { route }) => (
      sessions.find(({ name }) => name === (route.params.session || 'default'))?.id
    ),

    // bindings to the active session
    session: (state, { active }) => state.sessions[active] ?? undefined,

    // trailing chunk of the active session
    trail: (_, { session }) => {
      const { data = [] } = session
      
      const row = data[data.length - 1] ?? []
      const chunk = row[row.length - 1] ?? {}

      return chunk
    },

    // get session id from session name
    id: state => name => (
      Object.values(state.sessions)
      .find(session => session.name === name)?.id
    ),
  }
}
