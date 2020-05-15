import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/store/api'
import sessions from '@/store/sessions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    api,
    sessions,
  },
})

export default store
