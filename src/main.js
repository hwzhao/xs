// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

// router.beforeEach((to, from, next) => {
//   if (from.name === 'Read') {
//     var r = confirm('是否加入书架')
//     if (r === true) {
//       console.log(Vue.)
//       next()
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

Vue.filter('cover', function (value) {
  if (value) {
    return value.replace(/^\/agent\//, '')
  } else {
    return ''
  }
})

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
      addBbookrack (state, bookrack) {
        var oldBookrack = state.bookrack.find(function (book) {
          return book.id === bookrack.id
        })
        if (typeof oldBookrack !== 'object') {
          state.bookrack.push(bookrack)
        }
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
