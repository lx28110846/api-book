<template>
  <div class="app-main">
    <div class="container is-fluid is-marginless app-content">
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      msg: 'this is AppMain.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.app-main {
  min-width: 1200px;
  margin-left: 50px;
  // transform: translate3d(0, 0, 0);

}

.container {
  position: relative;
}

.app-content {
  padding: 20px;
}
</style>
