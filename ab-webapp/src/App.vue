<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <sidebar></sidebar>
    <app-main></app-main>
  </div>
</template>

<script>
import NprogressContainer from '@/components/vue-nprogress/NprogressContainer'
import { Sidebar, AppMain } from '@/components/layout'
import Vue from 'vue'

export default {
  components: {
    NprogressContainer,
    Sidebar,
    AppMain
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/reset.css';
@import '~animate.css';
.animated {
  animation-duration: .377s;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>
