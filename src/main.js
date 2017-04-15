// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store(
  {
    state: {
      searchList: []
    },
    mutations: {
      setSearch (state, search) {
        state.searchList = search
        window.localStorage.setItem('searchList', JSON.stringify(state.searchList))
      }
    }
  }
)

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

Vue.config.productionTip = true
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
