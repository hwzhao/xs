<template>
  <div class="hello">
    <header>
      <router-link to='/'>返回</router-link>
      <input type="text" name="query" value="" placeholder="搜索图书或作者" v-model="query" @change="search">
      <button type="button" name="button">搜索</button>
    </header>
    {{keywords}}
  </div>
</template>

<script>
import { apiAutocomplate } from '@/service/index.js'
export default {
  name: 'search',
  data () {
    return {
      query: '',
      books: {},
      keywords: {}
    }
  },
  methods: {
    search () {
      const self = this
      apiAutocomplate(self, this.query)
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
