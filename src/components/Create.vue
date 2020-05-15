<template>
  <li class="create">
    <input ref="input" v-model.trim="value"
      type="text"
      @keypress.enter="dispatch" />
    <button href="#" :disabled="disabled" @click="dispatch">[+]</button>
  </li>
</template>

<script>
const REGEXP = /^[a-z0-9][a-z0-9_.-]{2,62}[a-z0-9]$/i

export default {
  watch: {
    value(val) {
      this.disabled = !REGEXP.test(val)
    },
  },

  data: () => ({
    value: '',
    disabled: true,
  }),

  methods: {
    dispatch(e) {
      e.preventDefault()
      e.stopImmediatePropagation()

      if (this.disabled)
        return

      this.$emit('submit', this.value)
      this.value = ''
      
      setTimeout(() => this.$refs.input.blur(), 50)
    },
  }
}
</script>

<style scoped>
.create {
  position: relative;
  display: flex;
  cursor: pointer;
}

.create :first-child {
  flex: 1 1 auto;
}

.create input {
  display: block;
  width: 1%;
  margin: 1em;
  background: transparent;
  border: none;
  border-bottom: 1px solid currentColor;

  outline: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
}

.create button {
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

.create button[disabled] {
  opacity: .5;
  cursor: not-allowed;
}

.create button:not([disabled]):hover {
  background: var(--hovered);
  color: var(--background);

  text-decoration: underline;
}
</style>
