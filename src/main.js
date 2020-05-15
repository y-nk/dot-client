import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'

Vue.config.productionTip = false
sync(store, router)

// default terminal session
store.dispatch('sessions/create', { name: 'default' })

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
