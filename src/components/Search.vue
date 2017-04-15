<template>
  <div class="xs-search-view">
    <header class="xs-search after-boeder">
      <router-link to='/' class="xs-icon xs-icon-back"></router-link>
      <form class="search-form" @submit.prevent="search" >
        <div class="search-box">
          <i class="xs-icon xs-icon-search"></i>
          <input type="text" name="query" v-focus class="search-input" placeholder="搜索图书或作者" v-model="query">
          <i class="xs-icon xs-icon-close" @click="query = '';type = 0" v-if="query!= ''"></i>
        </div>
      </form>
      <a class="search-submit" :class="{'active':query.length}" name="button" @click="search">搜索</a>
    </header>
    <div class="history" v-show="type === 0">
      <div class="header" v-if="searchList.length > 0">
        搜索历史
        <span @click="clear">清空</span>
      </div>
      <ul class="" v-if="searchList.length > 0">
        <li v-for="(search, index) in searchList" :style="{'background-color': bColor[index]}" @click="autoClick(search)">
          {{search}}
          <i class="xs-icon xs-icon-close" @click.stop="del(index)"></i>
        </li>
      </ul>

        <div class="" v-if="searchList.length == 0">
          赶快搜索好书来看吧
        </div>
    </div>

    <ul class="auto after-boeder" v-show="type === 1">
      <li v-for="keyword in keywords" class="after-boeder" @click="autoClick(keyword)">{{keyword}}</li>
    </ul>
    <div class="" v-if="type === 2">
      搜索中。。。。
    </div>
    <ul class="books after-boeder" v-show="type== 3">
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

    <div class="" v-if="type === 3 && books.length == 0">
      我擦，找不到哎╮(╯▽╰)╭
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      query: '',
      books: [],
      keywords: [],
      autoQuert: '',
      type: 0,
      bColor: ['#178df1', '#df1717', '#36b54e', '#febc2a', '#fd5d23', '#839eb1']
    }
  },
  computed: {
    ...mapState({
      'searchList': state => state.searchList
    })
  },
  filters: {
    cover (value) {
      return value.replace(/^\/agent\//, '')
    }
  },
  methods: {
    del (index) {
      let searchList = this.searchList
      searchList.splice(index, 1)
      this.$store.commit('setSearch', searchList)
    },
    clear () {
      this.$store.commit('setSearch', [])
    },
    search () {
      this.query = this.query.replace(/(^\s*)|(\s*$)/g, '')
      if (this.query === '') {
        return ''
      }
      const self = this
      this.type = 2
      this.$http.get(`/api/book/fuzzy-search`, {
        params: {
          'query': this.query,
          'start': '0',
          'limit': '4'
        }
      })
      .then(function (response) {
        self.books = response.data.books
        if (self.searchList.indexOf(self.query) === -1) {
          let searchList = self.searchList
          searchList.push(self.query)
          self.$store.commit('setSearch', searchList)
        }
        self.type = 3
      })
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
      newvalue = newvalue.replace(/(^\s*)|(\s*$)/g, '')
      this.books = ''
      if (newvalue.length && this.autoQuert !== this.query) {
        const self = this
        this.type = 1
        this.$http.get(`/api/book/auto-complete`, {
          params: {
            'query': this.query
          }
        })
        .then(function (response) {
          self.keywords = response.data.keywords
        })
      }
    }
  },
  created () {
    this.$store.commit('setSearch', JSON.parse(window.localStorage.getItem('searchList')))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/style.scss";
  .history {
    padding: 10px 20px;
    .header {
      text-align: left;
      font-size: 12px;
      span {
        float: right;
      }
    }
    ul {
      padding: 10px 0;
      margin-left: -10px;
      li {
        float: left;
        padding: 5px 8px;
        border-radius: 15px;
        font-size: 14px;
        color: #fff;
        margin: 10px;
        position: relative;

        .xs-icon-close {
          margin-left: 10px;
        }
      }
    }
  }
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
