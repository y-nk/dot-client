<template>
  <li class="session" :class="{ active, blink }">
    <button @click="$emit('focus', id)">{{ name }}</button>
    <button v-if="deletable" @click="$emit('destroy', id)">[x]</button>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    update: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: false,
    },

    deletable: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({ blink: false }),

  watch: {
    update() {
      clearTimeout(this.timer)

      if (this.active)
        return

      this.blink = true
      this.timer = setTimeout(() => this.blink = false, 25)
    },
  },
}
</script>

<style scoped>
.session {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 0;
  cursor: pointer;
  opacity: .8;

  transition: background-color .2s;
}

.session.blink {
  animation: blink .4s forwards infinite;
}

.session:hover {
  background: var(--hovered);
  color: var(--strong);
}

.session.active {
  background: var(--selected);
  color: var(--strong);
}

.session :first-child {
  flex: 1 1 auto;
}

.session button {
  display: block;
  padding: 1em;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  font: inherit;
  color: inherit;
  text-align: inherit;
  text-decoration: none;

  transition: background-color .2s;
}

.session button:hover {
  background: var(--hovered);
  text-decoration: underline;
}

@keyframes blink {
  from { color: var(--spectacular); }
}
</style>
