<template>
  <div class="bookrack">
    <div class="header after-boeder">
      <span>我的书架</span>
      <router-link to="/search" class="search"> <i class="xs-icon xs-icon-search"></i>搜索</router-link>
    </div>
    <div class="xs-flex-box">
      <div class="xs-flex-item" v-for="(book, index) in bookrack" @click="goRead(book)">
        <div class="bookrack-item">
          <div class="img-box">
            <img :src="book.cover | cover" class="cover" alt="">
          </div>
          <div class="tocname">
            {{book.tocName}}
          </div>
          <div class="title">{{book.title}}</div>
        </div>
      </div>
      <div class="xs-flex-item">
        <div class="bookrack-item">
          <router-link to="/search" class="more">+</router-link>
        </div>
      </div>
    </div>

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
<style lang="scss">
.xs-flex-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .xs-flex-item {
    flex: 0 33.33%;
    overflow: hidden;
  }
}
.bookrack {
  .header {
    text-align: left;
    padding: 10px;
    .search {
      float: right;
    }
  }
  .bookrack-item {
    padding: 0 10px;
    text-align: left;
    margin-top: 15px;
    .img-box {
      height: 150px;
    }
    .cover {
      width: 100%;
      height: auto;
      max-height: 150px;
    }
    .title {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      margin-top: 5px;
    }
    .tocname {
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      margin-top: 5px;
      white-space: nowrap;
    }
    .more {
      position: relative;
      display: block;
      background-color: #ddd;
      text-align: center;
      margin-bottom: 60px;
      height: 150px;
      line-height: 150px;
      font-size: 60px;
      color: #fff;
    }
  }
}
</style>
