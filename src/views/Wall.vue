<template>
  <div class="welcome">
    <terminal :data="data" />
    <keyboard @type="type" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import api from '@/api'

import Terminal from '@/components/Terminal'
import Keyboard from '@/components/Keyboard'

import license from '@/assets/license.txt'

export default {
  components: { Terminal, Keyboard },

  computed: {
    active: vm => vm.$store.getters['sessions/active'],
    data: vm => vm.$store.getters['sessions/session']?.data ?? [],
  },

  async mounted() {
    await this.play(this.$t('auth.welcome'))

    let username, error

    while (true) {
      username = await this.prompt()
      error = await this.$store.dispatch('api/login', username)

      if (error)
        await this.play(this.$t(`auth.${error}`))
      else {
        this.$store.dispatch('sessions/page', this.active)
        await this.play(this.$t('auth.success', [username]))
        
        await this.play(this.$t('main.instructions', [username]))
        break
      }
    }
  },

  methods: {
    type(payload) {
      this.$store.dispatch('sessions/type', payload)
    },

    async play(data) {
      await this.$store.dispatch('sessions/message', {
        id: this.active, data
      })
    },

    async prompt() {
      await this.play(this.$t('auth.prompt'))

      const username = await this.$store.dispatch('sessions/prompt')
      return username
    }
  }
}
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

.welcome .terminal {
  flex: 1 1 auto;
}

.welcome .keyboard {
  flex: 0 1 auto;
}
</style>
