<template>
  <ul class="menu">
    <session :key="i" v-for="(session, i) in sessions"
        :id="session.id"
        :name="session.name"
        :update="session.heartbeat"
        :active="active === session.id"
        :deletable="i !== 0"
        @focus="id => $emit('focus', id)"
        @destroy="id => $emit('destroy', id)"
        />
    <create @submit="name => $emit('create', name)" />
  </ul>
</template>

<script>
import { mapState } from 'vuex'

import Session from '@/components/Session'
import Create from '@/components/Create'

export default {
  components: { Session, Create },

  props: {
    sessions: {
      type: Array,
      required: true,
    },

    active: {
      type: String,
      default: undefined,
    },
  },
}
</script>

<style scoped>
.menu {
  overflow: hidden;
  
  margin: 0;
  padding: 0;

  background: var(--background);
  border-right: 1px solid var(--black);
  color: var(--primary);
}
</style>
