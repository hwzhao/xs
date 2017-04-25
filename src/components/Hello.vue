<template>
  <div class="hello">
    <h2>Vue小说阅读器</h2>
    <ul>
      <li v-for="(book, index) in bookrack">{{book.title}}
        <img :src="book.cover | cover" alt=""></li>
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
  created () {
    console.log(window.localStorage.getItem('bookrack'))
    if (window.localStorage.getItem('bookrack') === null) {
      window.localStorage.setItem('bookrack', '[]')
    }
    this.$store.commit('setBookrack', JSON.parse(window.localStorage.getItem('bookrack')))
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
