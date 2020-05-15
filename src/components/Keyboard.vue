<template>
  <input class="keyboard"

    @keydown.stop="onkeydown"
    @keyup.stop="onkeyup"

    @compositionstart.stop="oncompositionstart"
    @compositionupdate.stop="oncompositionupdate"
    @compositionend.stop="oncompositionend"

    @input.stop="oninput"

    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    autofocus
    />
</template>

<script>
const isBackspace = e => e.code === 'Backspace' || e.keyCode === 8

const isTab = e => e.code === 'Tab' || e.keyCode === 9

const isEnter = e => (
     e.inputType === "insertLineBreak"
  || e.code === 'Enter'
  || e.keyCode === 13
)


export default {
  data: () => ({
    isComposing: undefined,
    justEndedComposing: false,
    composingBuffer: '',
  }),

  mounted() {
    this.$on('input', data => {
      const ime = typeof data !== 'string'
      this.$emit('type', { data, ime })
    })

    this.compose(false)

    this.timer = setInterval(() => {
      const { nodeName } = document.activeElement

      if (nodeName !== 'INPUT')
        this.$el.focus()
    }, 100)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    compose(val) {
      this.isComposing = val

      this.$el.value = ''
      this.justEndedComposing = false
      this.composingBuffer = ''
    },

    oninput(e) {
      if (this.isComposing !== e.isComposing)
        this.compose(e.isComposing)

      if (this.isComposing || isBackspace(e) || isEnter(e))
        return

      const value = e.inputType === 'insertFromPaste'
        ? e.target.value
        : e.data

      this.$emit('input', value)
      this.$el.value = ''
    },

    onkeydown(e) {
      if (this.justEndedComposing)
        this.compose(false)

      if (this.isComposing)
        return

      if (isBackspace(e)) {
        e.preventDefault()
        this.$emit('input', '\b')
      }

      if (isTab(e)) {
        e.preventDefault()
        this.$emit('input', '\t')
      }
    },

    onkeyup(e) {
      if (!isEnter(e))
        return

      e.preventDefault()
    
      if (this.isComposing) {
        if (!this.justEndedComposing) {
          this.$el.disabled = true
          setImmediate(() => this.$el.disabled = false)
        }
          
        this.compose(false)
        return
      }

      if (!this.composingBuffer.length)
        this.$emit('input', '\n')  
    },

    oncompositionstart(e) {
      this.compose(true)
    },

    oncompositionupdate(e) {
      this.$emit('input', {
        original: this.composingBuffer,
        replacement: e.data,
      })

      this.composingBuffer = e.data
    },

    oncompositionend(e) {
      this.justEndedComposing = true
    },
  }
}
</script>

<style scoped>
.keyboard {
  position: absolute;
  top: 0;
  left: 0;
}

.keyboard:not(.debug) {
  z-index: -1;
  background: transparent;
  border: none;
  color: rgba(0, 0, 0, 0);
  outline: none;
}
</style>
