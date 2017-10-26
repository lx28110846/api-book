import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from './lazyLoading'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/apiview',
      name: 'api',
      component: lazyLoading('apiview/ApiView')
    },{
      path: '/dbtable',
      name: 'dbtable',
      component: lazyLoading('dbtable/DBTable')
    }
  ]
})
