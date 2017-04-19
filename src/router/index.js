import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Search from '@/components/Search'
import Info from '@/components/Info'
import Read from '@/components/Read'

Vue.use(Router)

export default new Router({
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
    },
    {
      path: '/Read',
      name: 'Read',
      component: Read
    }
  ]
})
