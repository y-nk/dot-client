import { register, bind, invite, join, leave, send } from '@/api'
import io from '@/api/socket'

export default {
  namespaced: true,

  state: {
    keyboard: Date.now(),
    username: undefined,
    token: undefined,
    rooms: {},
  },

  actions: {
    async login({ state, commit, dispatch, getters }, username) {
      const { success, token, reason } = await register(username)

      if (!success)
        return reason

      const bound = await bind(token)

      if (!bound)
        return false

      commit('login', { username, token })

      // adding spontaneous events
      io.on('summon', ({ room, name }) => (
        dispatch('join', { room, name })
      ))

      io.on('rx', ({ room, ...payload }) => {
        if (state.rooms[room])
          dispatch('sessions/inject', {
            id: state.rooms[room],
            ...payload,
          }, { root: true })
      })

      // break the composition state of the keyboard
      io.on('break', () => commit('break'))

      this.subscribe(({ type, payload }) => {
        if (type !== 'sessions/destroy')
          return

        leave(state.token, getters.id(payload))
        commit('destroy', getters.id(payload))
      })
    },

    async invite({ state, commit, getters }, { user, session }) {
      if (!getters.auth)
        return

      const room = await invite(state.token, user)
      
      if (room)
        commit('create', { room, session })

      return !!room
    },

    async join({ state, commit, dispatch }, { room, name }) {
      if (!state.rooms[room]) {
        const id = await dispatch('sessions/create', { name }, { root: true })
        commit('create', { room, session: id })
      }

      const success = await join(state.token, room)

      if (!success)
        return false

      return true
    },

    async send({ state }, { room, ...data }) {
      send(state.token, room, {
        ...data, metadata: {
          author: state.username,
          color: 'foreign',
        }
      })
    },

    async break({ commit }) {
      commit('break', null)
      setImmediate(() => commit('break', Date.now()))
    },
  },

  mutations: {
    break(state, value) {
      state.keyboard = value
    },

    login(state, { username, token }) {
      state.username = username
      state.token = token
    },

    create(state, { room, session }) {
      state.rooms = {
        ...state.rooms,
        [room]: session,
      }
    },

    destroy(state, room) {
      const { [room]: omit, ...rooms } = state.rooms
      state.rooms = rooms
    },
  },

  getters: {
    auth: state => !!state.token,

    id: state => session => Object.entries(state.rooms)
      .find(([,value]) => value === session)
      ?.shift()
  },
}
