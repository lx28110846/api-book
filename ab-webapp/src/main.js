// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAxios from '@/components/vue-axios'
import mock from '@/mock'

import elementui from '@/components/elementui'

import VueNProgress from '@/components/vue-nprogress'

import iconfont_js from '@/assets/font/iconfont'
import Iconfont from './components/iconfont'

Vue.use(VueAxios);
Vue.use(VueNProgress);
const nprogress = new VueNProgress({ parent: '.nprogress-container' })
Vue.use(Iconfont);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  nprogress,
  template: '<App/>',
  components: { App }
})
