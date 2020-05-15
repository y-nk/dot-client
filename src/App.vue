<template>
  <div id="app">
    <wall v-if="!auth" />
    <router-view v-else />

    
  </div>
</template>

<script>
import Wall from '@/views/Wall'
import Main from '@/views/Main'

import Keyboard from '@/components/Keyboard'

export default {
  components: { Wall, Main, Keyboard },
  
  computed: {
    auth: vm => vm.$store.getters['api/auth'],
  },
}
</script>

<style>
:root {
  --black: #000;

  --background: #0d0b0e;
  --primary: #888;

  --hovered: rgba(255, 255, 255, calc(2 / 3));
  --selected: rgba(255, 255, 255, calc(9 / 10));

  --strong: #222;
  --spectacular: #fff;

  --local: #0094ff;
  --foreign: #ffca00;
}

* {
  box-sizing: border-box;
}

html, body {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;

  background: var(--background);
  color: var(--primary);

  font-family: 'Courier New', Courier, monospace;
}

#app {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
