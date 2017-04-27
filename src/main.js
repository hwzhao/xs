// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

router.beforeEach((to, from, next) => {
  if (window.localStorage.getItem('bookrack') === null) {
    window.localStorage.setItem('bookrack', '[]')
  }
  store.commit('setBookrack', JSON.parse(window.localStorage.getItem('bookrack')))
  next()
})

Vue.filter('cover', function (value) {
  if (value) {
    return value.replace(/^\/agent\//, '')
  } else {
    return ''
  }
})
import util from '@/util'
const store = new Vuex.Store(
  {
    state: {
      searchList: [],
      read: {
        id: 0,
        title: '',
        cover: '',
        tocId: 0,
        page: 1,
        tocs: [],
        preContent: '',
        tocContent: '',
        nextContent: ''
      },
      bookrack: []
    },
    mutations: {
      setSearch (state, search) {
        state.searchList = search
        window.localStorage.setItem('searchList', JSON.stringify(state.searchList))
      },
      setRead (state, read) {
        for (var key in read) {
          state['read'][key] = read[key]
        }
        window.localStorage.setItem('read', JSON.stringify(state.read))
      },
      setBookrack (state, bookrack) {
        state.bookrack = bookrack
        window.localStorage.setItem('bookrack', JSON.stringify(state.bookrack))
      },
      delBookrack (state, id) {
        state.bookrack.splice(id, 1)
        window.localStorage.setItem('bookrack', JSON.stringify(state.bookrack))
      },
      addBbookrack (state, bookrack) {
        console.log(1)
        var id = state.bookrack && util.objectFindByKey(state.bookrack, 'id', bookrack.id)
        if (id) {
          state.bookrack.splice(id, 1, bookrack)
        } else {
          state.bookrack.push(bookrack)
        }
        console.log(state.bookrack)
        window.localStorage.setItem('bookrack', JSON.stringify(state.bookrack))
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
