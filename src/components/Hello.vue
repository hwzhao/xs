<template>
  <div class="hello">
    <h2>Vue小说阅读器</h2>
    <div class="">
      <router-link to="/search"> <i class="xs-icon xs-icon-search"></i>搜索</router-link>
    </div>
    <ul>
      <li v-for="(book, index) in bookrack" @click="goRead(book)">
        {{book.title}}
        <img :src="book.cover | cover" alt="">
        {{book.tocName}}{{book.page}}
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'hello',
  computed: {
    ...mapState({
      'bookrack': state => state.bookrack
    })
  },
  data () {
    return {
    }
  },
  methods: {
    goRead (book) {
      book.tocContent = ''
      this.$store.commit('setRead', book)
      this.$router.push('/Read')
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
