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
    <div class="footer-item" v-show="!rackId">
      <a class="xs-btn" @click="joinRack">加入书架</a>
    </div>
    <div class="footer-item" v-show="rackId">
      <a class="xs-btn" @click="removeRack()">书架移除</a>
    </div>
    <div class="footer-item">
      <a class="xs-btn" @click="goRead(0)">开始阅读</a>
    </div>
  </div>
  <transition name="popup">
    <div class="popup-view" v-show="showMenu">
      <div class="tocs">
        <div class="tocs-header after-boeder">
          目录
        </div>
        <ul>
          <li v-for="(menu, index) in tocs" @click="goRead(index)">{{menu.title}}{{index}}</li>
        </ul>
      </div>
    </div>
  </transition>
  <a class="popup-mask" @click.stop="showMenu = !showMenu" :class="{'show': showMenu}" v-if="showMenu"></a>
</div>
</template>

<script>
import util from '@/util'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'info',
  computed: {
    ...mapState({
      'bookrack': state => state.bookrack
    }),
    rackId () {
      return util.objectFindByKey(this.bookrack, 'id', this.$route.params.id)
    }
  },
  data () {
    return {
      info: {},
      tocs: [],
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
    goRead (index) {
      var read = {}
      if (index === 0 && this.rackId) {
        read = this.bookrack[this.rackId]
        read.tocs = this.tocs
        read.tocContent = ''
      } else {
        read = {
          id: this.$route.params.id,
          title: this.info.title,
          cover: this.info.cover,
          tocId: index,
          tocContent: '',
          nextContent: '',
          preContent: '',
          tocs: this.tocs
        }
      }
      this.$store.commit('setRead', read)
      this.$router.push('/Read')
    },
    joinRack () {
      this.$store.commit('addBbookrack', {
        id: this.info._id,
        title: this.info.title,
        cover: this.info.cover,
        tocId: 0,
        tocName: this.tocs[0].title,
        page: 1
      })
    },
    removeRack () {
      this.$store.commit('delBookrack', this.rackId)
    }
  },
  created () {
    const self = this
    const id = this.$route.params.id
    self.$parent.loading.show = true
    this.$http.get(`https://xs.htmlbiji.com/index.php`, {
      params: {
        'url': `/book/${id}`
      }
    })
      .then(function (response) {
        self.info = response.data
        self.$parent.loading.content = '获取目录'
        self.$http.get(`https://xs.htmlbiji.com/index.php`, {
          params: {
            'url': `/mix-toc/${id}`
          }
        })
        .then(function (response) {
          self.tocs = response.data.mixToc.chapters
          self.$parent.loading.show = false
        })
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
.tocs {
  height: 400px;
  width: 100%;
  overflow-x: auto;
  .tocs-header {
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
