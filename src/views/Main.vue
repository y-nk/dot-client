<template>
  <div class="main">
    <transition name="enlarge" appear>
      <Menu
        :sessions="sessions"
        :active="active"
        @create="connect"
        @focus="focus"
        @destroy="destroy" />
    </transition>

    <terminal :user="myself" :data="data" />
    <keyboard v-if="key" :key="key" @type="type" />
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

import beforeRoute from '@/mixins/beforeRoute'

import Menu from '@/components/Menu'
import Terminal from '@/components/Terminal'
import Keyboard from '@/components/Keyboard'

export default {
  mixins: [beforeRoute((to, from, next) => {
    const names = store.getters['sessions/sessions'].map(({ name }) => name)
    const name  = to.params.session ?? ''

    if (name.length && !names.includes(name))
      return next('/')

    next()
  })],

  components: { Menu, Terminal, Keyboard },

  computed: {
    key : vm => vm.$store.state.api.keyboard,

    myself: vm => vm.$store.state.api.username,

    sessions: vm => vm.$store.getters['sessions/sessions'],
    default: vm => vm.$store.getters['sessions/id']('default'),

    active: vm => vm.$store.getters['sessions/active'],
    attached: vm => vm.$store.getters['api/id'](vm.active),

    session: vm => vm.$store.getters['sessions/session'],

    data: vm => vm.session?.data ?? [],
    lock: vm => vm.session?.lock ?? true,
  },

  methods: {
    type(payload) {
      this.$store.dispatch('sessions/type', payload)

      if (this.attached)
        this.$store.dispatch('api/send', { room: this.attached, ...payload })
    },

    async connect(user) {
      const id = await this.$store.dispatch('sessions/create', { name: user })
      const success = await this.$store.dispatch('api/invite', { user, session: id })

      if (success)
        this.focus(id)
      else {
        this.destroy(id)
        this.focus(this.default)

        this.$store.dispatch('sessions/message', {
          id: this.default, data: this.$t('main.notfound', [user])
        })
      }
    },

    focus(id) {
      const session = this.sessions.find(session => session.id === id)

      if (!session)
        return

      const name = session.name !== 'default' ? session.name : ''
      this.$router.push(`/${name}`)
    },

    destroy(id) {
      this.$store.commit('sessions/destroy', id)
    },
  }
}
</script>

<style scoped>
.main {
  display: grid;
  grid-template-areas: 'menu terminal' 'menu keyboard';
  grid-template-columns: min-content auto;
  grid-template-rows: auto 1vh;

  width: 100%;
  height: 100%;
}

.main .menu {
  grid-area: menu;
  width: 20vw;
}

.main .menu.enlarge-enter-active,
.main .menu.enlarge-leave-active {
  transition: width .4s;
}

.main .menu.enlarge-enter,
.main .menu.enlarge-leave-to {
  width: 0;
}

.main .terminal {
  grid-area: terminal;
}

.main .keyboard {
  grid-area: keyboard;
}
</style>
