import Vue from 'vue'
import Vuex from 'vuex'

import apiview from './modules/apiview'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    modules: {
        apiview
    }
})