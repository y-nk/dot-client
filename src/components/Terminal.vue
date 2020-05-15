<template>
  <div class="terminal">
    <slot />

    <div v-if="!data.length" class="row" />

    <div v-else :key="i" v-for="(row, i) in data" class="row">
      <span :key="j" v-for="(chunk, j) in row"
        class="chunk" :class="type(chunk.metadata)" :style="style(chunk.metadata)"
        :data-author="author(chunk.metadata)">{{ chunk.data }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },

    user: {
      type: String,
      default: '',
    },

    watch: {
      data() {
        if (this.$el)
          this.$el.scrollTop = 999999
      },
    }
  },

  methods: {
    author({ author } = {}) {
      if (author === this.user)
        return 'myself'
      else if (author === 'system')
        return null

      return author
    },

    type({ author } = {}) {
      if (author === '~rainbow~')
        return 'rainbow'
    },

    style({ author } = {}) {
      if (['system', '~rainbow~'].includes(author))
        return

      if (author === this.user)
        return '--color: var(--local)'
      else
        return  '--color: var(--foreign)'
    }
  },
}
</script>

<style scoped>
.terminal {
  flex: 1 1 auto;

  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 2em;

  background: var(--background);
  color: var(--primary);
}

.row:not(:last-child):empty:before {
  content: '\00a0';
}

.row:last-child:after {
  content: '\02588';
  animation: blink 1.2s steps(2, start) infinite;
}

.chunk {
  position: relative;
  white-space: pre-wrap;
  word-break: break-all;

  color: var(--color, inherit);
}

.chunk:last-child:after {
  content: '\00a0';
  display: none;
}

.chunk[data-author]:before {
  content: attr(data-author);
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  padding: .25em .5em .125em;
  background: inherit;
  border-radius: 2px 2px 0 0;
  transform: translateY(-100%);
  font-size: .6em;
  word-break: keep-all;
}

.chunk[data-author]:hover {
  background: var(--color);
  border-radius: 0 2px 2px 2px;
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, .5);
}

.chunk[data-author]:hover:before {
  display: block;
}

.chunk.rainbow {
  color: #0ff;
  animation: rainbow 1s forwards infinite;
}

@keyframes blink {
  to { visibility: hidden; }
}

@keyframes rainbow {
  from { filter: hue-rotate(0deg) }
  to { filter: hue-rotate(360deg) }
}
</style>
