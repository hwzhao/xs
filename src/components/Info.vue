<template>
<div class="info">
  <header class="header after-boeder">
    <a @click='$router.back()' class="xs-icon xs-icon-back"></a>
    <span>图书详情</span>
  </header>
  <div class="content">
    <div class="basic">
      <img :src="info.cover | cover" alt="" class="cover">
      <div class="basic-info">
        <div class="title">{{info.title}}</div>
        <div class="author">作者：<span @click="$router.push(`/search?query=${info.author}`)"> {{info.author}} </span></div>
        <div class="word">字数：{{info.wordCount}}字   {{info.isSerial ? '连载中' : '已完结'}}</div>
        <div class="cate">{{info.majorCate}}/ {{info.minorCate}}</div>
      </div>
    </div>

    <div class="intro">
      {{info.longIntro}}
    </div>

    <div class="menu  before-border after-boeder" @click="showMenu = true">
      <div class="menu-l">
        <i class="xs-icon xs-icon-mulu"></i>目录
      </div>
      <div class="menu-r text-over">
        {{info.updated | uMoment}}  更新{{info.lastChapter}}
      </div>
    </div>

  </div>
  <div class="footer before-border">
    <div class="footer-item">
      <a class="xs-btn">加入书架</a>
    </div>
    <div class="footer-item">
      <a class="xs-btn" @click="goRead">开始阅读</a>
    </div>
  </div>
  <transition name="popup">
    <div class="popup-view" v-show="showMenu">
      <div class="menus">
        <div class="menus-header after-boeder">
          目录
        </div>
        <ul>
          <li v-for="(menu, index) in menus">{{menu.title}}</li>
        </ul>
      </div>
    </div>
  </transition>
  <a class="popup-mask" @click.stop="showMenu = !showMenu" :class="{'show': showMenu}" v-if="showMenu"></a>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'info',
  data () {
    return {
      info: '图书详情',
      menus: [],
      showMenu: false
    }
  },
  filters: {
    uMoment (value) {
      moment.locale('zh-cn')
      return moment(value).fromNow()
    }
  },
  methods: {
    goRead () {
      const read = {
        id: this.$route.params.id,
        tocs: this.menus,
        tocId: 0,
        tocContent: {
          body: `<p>${this.info.title}</p>`
        }
      }
      this.$store.commit('setRead', read)
      this.$router.push('/Read')
    }
  },
  created () {
    const self = this
    this.$http.get(`https://xs.htmlbiji.com/index.php`, {
      params: {
        'url': `/book/${this.$route.params.id}`
      }
    })
      .then(function (response) {
        self.info = response.data
      })
    self.$http.get(`https://xs.htmlbiji.com/index.php`, {
      params: {
        'url': `/mix-toc/${self.$route.params.id}`
      }
    })
    .then(function (response) {
      self.menus = response.data.mixToc.chapters
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/style.scss";
.header {
  display: flex;
  padding: 10px 0;
  position: fixed;
  align-items: center;
  width: 100%;
  background-color: #fff;
  top: 0;
  z-index: 2;
  .xs-icon-back {
    font-size: 25px;
    vertical-align: middle;
    padding: 0 8px;
    color: #686868;
  }
  p {
    text-align: center;
  }
}
.content {
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 15px;
  padding-right: 15px;
  .basic {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    .cover {
      width: 110px;
      height: 150px;
      margin-right: 15px;
    }
    .basic-info {
      text-align: left;
      font-size: 16px;
      color: #0d0d0d;
      .title {
        font-weight: bold;
        margin-bottom: 3px;
      }
      .author {
        margin-bottom: 3px;
        span {
          color: $default-color;
        }
      }
      .word {
        margin-bottom: 3px;
      }
    }
  }
}
.menu {
  overflow: hidden;
  line-height: 40px;
  margin-bottom: 25px;
  .menu-l {
    float: left;
  }
  .menu-r {
    float: right;
    max-width: 70%;
  }
}
.intro {
  text-align: justify;
  margin-bottom: 25px;
}
.footer {
  position: fixed;
  display: flex;
  background-color: #fff;
  bottom: 0;
  height: 60px;
  width: 100%;
  line-height: 60px;
  .footer-item {
    flex: 1;
    display: inline-block;
    .xs-btn {
      background-color: $default-color;
      padding: 10px 30px;
      color: #fff;
      border-radius: 25px;
    }
  }
}
.menus {
  height: 400px;
  width: 100%;
  overflow-x: auto;
  .menus-header {
    line-height: 40px;
    margin-bottom: 15px;
    background-color: #fff;
    position: fixed;
    width: 100%;
  }
  ul {
    margin-top: 50px;
  }
  li {
    text-align: left;
    margin-left: 20px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>
