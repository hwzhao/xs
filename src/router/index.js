import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Search from '@/components/Search'
import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Info/:id',
      name: 'Info',
      component: Info
    }
  ]
})
