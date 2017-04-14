<template>
  <div class="xs-search-view">
    <header class="xs-search after-boeder">
      <router-link to='/' class="xs-icon xs-icon-back"></router-link>
      <form class="search-form" @submit.prevent="search" >
        <div class="search-box">
          <i class="xs-icon xs-icon-search"></i>
          <input type="text" name="query" v-focus class="search-input" placeholder="搜索图书或作者" v-model="query">
          <i class="xs-icon xs-icon-close" @click="query = ''" v-if="query!= ''"></i>
        </div>
      </form>
      <a class="search-submit" :class="{'active':query.length}" name="button" @click="search">搜索</a>
    </header>
    <ul class="auto after-boeder" v-show="keywords.length > 0">
      <li v-for="keyword in keywords" class="after-boeder" @click="autoClick(keyword)">{{keyword}}</li>
    </ul>
    <ul class="books after-boeder" v-show="type== 'search'">
      <li v-for="book in books" class="after-boeder" v-if="books.length > 0">
        <img :src="book.cover | cover" alt="">
        <div class="">
          <span class="title">{{book.title}}</span>
          <p>
            {{book.author}}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { apiAutocomplate, apiSearch } from '@/service/index.js'
export default {
  name: 'search',
  data () {
    return {
      query: '',
      books: [],
      keywords: '',
      autoQuert: '',
      type: ''
    }
  },
  filters: {
    cover (value) {
      return value.replace(/^\/agent\//, '')
    }
  },
  methods: {
    search () {
      const self = this
      this.type = 'search'
      apiSearch(self, this.query)
      this.keywords = ''
    },
    autoClick (keyword) {
      this.autoQuert = keyword
      this.query = keyword
      this.search()
    }
  },
  watch: {
    query (newvalue) {
      this.books = ''
      if (newvalue && this.autoQuert !== this.query) {
        const self = this
        this.type = 'auto'
        apiAutocomplate(self, this.query)
      } else {
        this.keywords = ''
      }
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/style.scss";
  .xs-search {
    display: flex;
    padding: 10px 0;
    position: relative;
    align-items: center;

    .xs-icon-back {
      font-size: 25px;
      vertical-align: middle;
      padding: 0 13px;
      color: #686868;
    }

    .search-form {
      background-color: #f2f2f2;
      border-radius: 15px;
      padding: 5px;
      flex: 1;
      text-align: left;
      line-height: 28px;

      .search-box {
        padding: 0 30px;
        position: relative;
      }

      .xs-icon-search {
        position: absolute;
        left: 4px;
        line-height: 28px;
      }

      .xs-icon-close {
        position: absolute;
        right: 4px;
        top: 0;
        font-size: 24px;
        line-height: 25px;
        color: #a9a9a9;
      }
    }

    .search-input {
      background: transparent;
      border: 0;
      width: 100%;
      padding: 0;
      line-height: 24px;
      color: #585858;
      &:focus {
        outline: 0;
      }
    }

    .search-submit {
      padding: 0 15px;
      font-size: 21px;
      vertical-align: middle;
      line-height: 28px;
      color: #e5e5e5;
      &.active {
        color: $default-color;
      }
    }
  }
  .auto {
    position: relative;
    li {
      position: relative;
      list-style: none;
      text-align: left;
      padding: 20px;
    }
  }
  .books {
    position: relative;
    li {
      list-style: none;
      position: relative;
      display: flex;
      text-align: left;
      align-items: center;
      padding: 20px;
      img {
        width: 80px;
        height: 100px;
        margin-right: 15px;
      }
      .title {
        font-weight: bold;
      }
    }
  }
</style>
