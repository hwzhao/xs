<template lang="html">
  <div class="read-view" :style="{'background-color': bg}">
    <!-- 内容 -->
    <div class="content-view">
      <div class="head">
        {{read.tocContent.title}}
      </div>
      <div class="read-content" :style="{'font-size': `${fz}px`, 'line-height': lineHeight}">
        <article >
          <section class="read" v-tocContent="{'methods': getCount}" :style="readStyle" >
            <p v-html="read.tocContent.body"></p>
          </section>
        </article>
      </div>
      <div class="count" v-show="!showOpt">
        {{page}}/ {{count}}
        <div class="time" style="float: right;">
          {{time}}
        </div>
      </div>
    </div>
    <!-- end内容 -->

    <!-- 翻页效果区 -->
    <div class="action-view" v-show="!showOpt">
      <div class="left" @click="page = page - 1"> </div>
      <div class="center" @click.stop="showOpt = true"></div>
      <div class="right" @click="page = page + 1"></div>
    </div>
    <!-- end翻页效果区 -->

    <!-- 设置区 -->
    <div class="option-view" @click="showOpt = false" v-show="showOpt">
      <div class="head">
        <router-link to="/" class="xs-icon-back xs-icon"></router-link>
        <span class="exchange" @click.stop="getSource">
          换源
        </span>
      </div>
      <div class="source before-border" v-show="showsource">
        <ul>
          <li v-for="(item, index) in source" @click.stop="exchangesource(item._id)" v-show="item.source !== 'zhuishuvip'">
            <div class="">
              {{item.name}}
              {{item.updated | uMoment}}
              {{item.lastChapter}}
            </div>
          </li>
        </ul>
      </div>
      <transition name="popup">
        <div class="popup-view  after-border" v-show="showToc">
          <div class="tocs ">
            <div class="tocs-header after-boeder">
              目录 <a @click.stop="reverseToc" style="float: right" hidden="hidden">{{read.tocReverse ? '正序' : '倒序'}}</a>
            </div>
            <ul>
              <li v-for="(toc, index) in read.tocs" @click="goRead(index)" :class="{'active': read.tocId == index}">{{toc.title}}{{index}}</li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="popup">
        <div class="rate-view opt-view after-border" v-show="showRate">
          <div class="header">
            <a @click="page = 0">上一章</a>
            <span>{{read.tocContent.title}}</span>
            <a @click="page = 1000">下一章</a>
          </div>
        </div>
      </transition>
      <transition name="popup">
        <div class="opt-view after-border setting-view" v-show="showSetting">
          <div class="font after-border">
            <a @click="fz--"> A-</a>
            <a @click="fz ++"> A+</a>
          </div>
          <div class="bg-view">
            <div class="bg-item" v-for="(item, index) in bgArray" :class="{'selected': item == bg}">
              <label>
                <input type="radio" name="bg" v-model="bg" :value="item">
                {{item}}
              </label>
            </div>
          </div>
        </div>
      </transition>
      <div class="footer">
        <div class="btn-group">
          <a @click.stop="showToc = !showToc"><i class="xs-icon xs-icon-mulu"></i><h4>目录</h4></a>
          <a @click.stop="showRate = !showRate"><i class="xs-icon xs-icon-jindu"></i><h4>进度</h4></a>
          <a @click.stop="showSetting = !showSetting"><i class="xs-icon xs-icon-shezhi"></i><h4>设置</h4></a>
          <a ><i class="xs-icon xs-icon-yejian"></i> <h4>夜间</h4></a>
          <router-link :to="'/Info/' + read.id"><i class="xs-icon xs-icon-neirong"></i><h4>详情</h4></router-link>
        </div>
      </div>
    </div>
    <!-- end设置区 -->
  </div>
</template>

<script>
import util from '@/util'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'read',
  computed: {
    ...mapState({
      'read': state => state.read,
      'bookrack': state => state.bookrack
    }),
    // 翻页效果
    readStyle () {
      return {
        'transform': `translateX(-${(this.page - 1) * this.clientWidth}px)`,
        'transition': (this.page > 1) ? 'all .3s' : 'none'
      }
    },
    // 书架id
    rackId () {
      return util.objectFindByKey(this.bookrack, 'id', this.read.id)
    }
  },
  filters: {
    uMoment (value) {
      // 转换时间
      moment.locale('zh-cn')
      return moment(value).fromNow()
    }
  },
  directives: {
    // 获取内容页数
    'tocContent': {
      bind (el, binding) {
        const count = el.scrollWidth / el.clientWidth
        binding.value.methods.call(this, count, el.clientWidth)
      },
      componentUpdated (el, binding) {
        const count = el.scrollWidth / el.clientWidth
        binding.value.methods.call(this, count, el.clientWidth)
      }
    }
  },
  data () {
    return {
      showOpt: false,
      showsource: false,
      source: [],
      showToc: false,
      showRate: false,
      showSetting: false,
      page: 1,
      count: 1,
      clientWidth: '',
      fz: 21,
      lineHeight: 1.8,
      bg: '#123',
      bgArray: ['#123', 'blue', 'red', 'orange'],
      time: new Date().toLocaleTimeString()
    }
  },
  methods: {
    reverseToc () {
      this.$store.commit('setRead', {
        'tocs': this.read.tocs.reverse(),
        'tocReverse': !this.read.tocReverse
      })
    },
    // 目录跳转
    goRead (index) {
      this.$store.commit('setRead', {
        'tocId': index,
        'tocContent': '',
        'nextContent': '',
        'preContent': ''
      })
    },
    // 获取分页和页面宽度
    getCount (count, width) {
      this.count = count
      this.clientWidth = width
    },
    /*
     * 获取来源
     * api ： /toc?view=summary&book={小说id}
    */
    getSource () {
      this.showsource = !this.showsource
      if (this.showsource) {
        const self = this
        this.$http.get('https://xs.htmlbiji.com/index.php', {
          params: {
            'url': `/toc?view=summary&book=${this.read.id}`
          }
        })
        .then(function (response) {
          self.source = response.data
        })
      }
    },
    /*
     * 切换来源
     * 获取章节列表
     * api ： /toc/{来源id}?view=chapters
     * 设置当前章节内容为空
    */
    exchangesource (id) {
      const self = this
      this.$http.get(`https://xs.htmlbiji.com/index.php`, {
        params: {
          'url': `/toc/${id}?view=chapters`
        }
      })
      .then(function (response) {
        self.$store.commit('setRead', {
          'tocs': response.data.chapters,
          'sourceId': id,
          'tocContent': '',
          'nextContent': '',
          'preContent': ''
        })
      })
    },
    /*
     * 获取章节内容
     * api ： /chapter/{章节链接}?k=2124b73d7e2e1945&t=1468223717
    */
    getConent (id, callback) {
      const self = this
      this.$http.get('https://xs.htmlbiji.com/index.php', {
        params: {
          chapter: 1,
          url: `/chapter/${this.read.tocs[id].link}?k=2124b73d7e2e1945&t=1468223717`
        }
      })
      .then(function (response) {
        if (response.data.ok) {
          if (callback && typeof callback === 'function') {
            response.data.chapter.body = response.data.chapter.body.replace(/\s/g, '</p><p>')
          }
        } else {
          self.$parent.loading = {
            show: true,
            content: '获取章节内容失败'
          }
          response.data = {
            chapter: {
              body: '获取章节内容失败'
            }
          }
          setTimeout(function () {
            self.$parent.loading = {
              show: false,
              content: '加载中'
            }
            self.showOpt = true
          }, 2000)
        }
        callback(response.data)
      })
    }
  },
  watch: {
    // 设置的显示与隐藏
    showOpt (value) {
      if (value === false) {
        this.showRate = this.showsource = this.showToc = this.showSetting = false
      }
    },
    showRate (value) {
      if (value === true) {
        this.showsource = this.showToc = this.showSetting = false
      }
    },
    showsource (value) {
      if (value === true) {
        this.showRate = this.showToc = this.showSetting = false
      }
    },
    showToc (value) {
      if (value === true) {
        this.showsource = this.showRate = this.showSetting = false
      }
    },
    /*
     * 监测页码
     * 当page === 0 上一章
     * page > 章节总页数 下一章
    */
    page (value, oldValue) {
      if (value === 0) {
        if (this.read.tocId >= 1) {
          this.$store.commit('setRead', {
            'preContent': '',
            'tocContent': this.read.preContent,
            'nextContent': this.read.tocContent,
            tocId: this.read.tocId - 1
          })
        } else {
          this.$parent.loading = {
            show: true,
            content: '已是第一张'
          }
          const self = this
          setTimeout(function () {
            self.$parent.loading = {
              show: false,
              content: '加载中'
            }
          }, 1000)
        }
        this.page = 1
      } else if (value > this.count) {
        if (this.read.tocId < this.read.tocs.length - 1) {
          this.$store.commit('setRead', {
            'preContent': this.read.tocContent,
            'tocContent': this.read.nextContent,
            'nextContent': '',
            tocId: this.read.tocId + 1
          })
          this.page = 1
        } else {
          this.page = oldValue
          this.$parent.loading = {
            show: true,
            content: '获取最新章节'
          }
          const self = this
          this.$http.get(`https://xs.htmlbiji.com/index.php`, {
            params: {
              'url': `/mix-toc/${this.read.id}`
            }
          })
          .then(function (response) {
            self.$store.commit('setRead', {
              'tocs': ['']
            })
            if (self.read.tocId >= (self.read.tocs.length - 1)) {
              self.$parent.loading.content = '已是最后一张'
              setTimeout(function () {
                self.$parent.loading = {
                  show: false,
                  content: '加载中'
                }
              }, 1000)
            } else {
              self.$store.commit('setRead', {
                'preContent': self.read.tocContent,
                'tocContent': self.read.nextContent,
                'nextContent': '',
                tocId: self.read.tocId + 1
              })
              self.page = 1
            }
          })
        }
      }
      this.$store.commit('setRead', {
        page: value
      })
    },
    /*
     * 监测章节id
     * 其实主要是监测是否有上一章节和下一章节
    */
    'read.tocId' (value) {
      if (value && value >= 0) {
        const self = this
        if (!this.read.preContent) {
          this.getConent(value - 1, function (response) {
            self.$store.commit('setRead', {
              'preContent': response.chapter
            })
          })
        }
        if (!this.read.nextContent) {
          this.getConent(value + 1, function (response) {
            self.$store.commit('setRead', {
              'nextContent': response.chapter
            })
          })
        }
      }
    },
    // 单独监测当前章节内容
    'read.tocContent' (value) {
      if (value === '' || !value.body && this.read.tocId > 0) {
        const self = this
        self.$parent.loading.show = true
        this.getConent(this.read.tocId, function (response) {
          self.$store.commit('setRead', {
            'tocContent': response.chapter
          })
          self.$parent.loading.show = false
        })
      }
    }
  },
  created () {
    this.$parent.loading = {
      show: true
    }
    if (window.localStorage.getItem('read') === null) {
      this.$router.push('/Search')
    }
    this.$store.commit('setRead', JSON.parse(window.localStorage.getItem('read')))
    const self = this
    // 显示时间
    setInterval(function () {
      self.time = new Date().toLocaleTimeString()
    }, 1000)
    // 获取章节目录及内容
    if (this.read.tocs.length <= 0) {
      this.$http.get(`https://xs.htmlbiji.com/index.php`, {
        params: {
          'url': `/mix-toc/${this.read.id}`
        }
      })
      .then(function (response) {
        self.$store.commit('setRead', {
          'tocs': response.data.mixToc.chapters
        })
        self.getConent(self.read.tocId, function (response) {
          self.$store.commit('setRead', {
            'tocContent': response.chapter
          })
          self.$parent.loading.show = false
        })
      })
    } else {
      self.getConent(self.read.tocId, function (response) {
        self.$store.commit('setRead', {
          'tocContent': response.chapter
        })
        self.$parent.loading.show = false
      })
    }
    self.page = self.read.page
  },
  // 离开前加入书架及更新书架
  beforeRouteLeave (to, from, next) {
    if (this.rackId) {
      this.$store.commit('addBbookrack', {
        id: this.read.id,
        title: this.read.title,
        cover: this.read.cover,
        tocId: this.read.tocId,
        tocName: this.read.tocContent.title,
        page: this.read.page
      })
      next()
    } else {
      var r = confirm('是否加入书架')
      if (r === true) {
        this.$store.commit('addBbookrack', {
          id: this.read.id,
          title: this.read.title,
          cover: this.read.cover,
          tocId: this.read.tocId,
          tocName: this.read.tocContent.title,
          page: this.read.page
        })
        next()
      } else {
        next()
      }
    }
  }
}
</script>

<style lang="scss">
  .read-view {
    padding: 0 15px;
    height: 100vh;
    position: relative;
    z-index: 1;
    color: #fff;
    .head {
      position: fixed;
      top: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
    }
    .read-content {
      position: absolute;
      top: 30px;
      bottom: 20px;
      left: 15px;
      right: 15px;
      overflow: hidden;
      p {
        margin: 2px 0;
        text-indent: 2em;
      }
      article {
        height: 100%;
        overflow: hidden;
      }

      .read {
        text-align: justify;
        column-count: 1;
        column-gap: 0;
        column-width: cacl(100vw);
        columns: 100vw 1;
        height: 100%;
      }
    }
    .count {
      position: fixed;
      bottom: 0;
      left: 15px;
      right: 15px;
      text-align: left;
    }
    .action-view {
      .left {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50%;
          height: 100%;
      }
      .right {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 50%;
          height: 100%;
      }
      .center {
        position: absolute;
        width: 200px;
        height: 200px;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 1;
      }
    }
  }
  .option-view {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    .head {
      background-color: rgba(0, 0, 0, 0);
      position: relative;
      color: #fff;
      height: 30px;
      padding: 3px 0;
      line-height: 30px;
      text-align: left;
      a {
        color: #fff;
        font-size: 20px;
        vertical-align: -2px;
        margin: 0 15px;
      }
      .exchange {
        float: right;
        margin-right: 15px;
      }
    }
    .source {
      position: relative;
      left: 20%;
      right: 0;
      max-height: 300px;
      background-color: rgba(255, 255, 255, 1);
      color: #000;
      text-align: left;
      margin-left: -15px;
      padding: 15px;
      overflow-y: scroll;
    }
    .popup-view {
      bottom: 50px;
      background-color: rgba(255, 255, 255, 1);
      color: #000;
      overflow: scroll;
      text-align: left;
      z-index: 2;
      .tocs-header {
        padding: 0 15px;
        background-color: rgba(255, 255, 255, 1);
        color: #000;
      }
    }
    .opt-view {
      position: fixed;
      bottom: 50px;
      left: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 1);
      padding: 10px;
      color: #000;
    }
    .bg-view {
      display: flex;
      margin: 10px -5px;
      .bg-item {
        height: 30px;
        flex: 1;
        padding: 0 5px;
        input {
          display: none;
        }
        label {
          width: 100%;
          height: 100%;
          border-radius: 3px;
          border: 1px solid #ddd;
          display: inline-block;
        }
      }
    }
    .footer {
      background-color: rgba(0, 0, 0, 0);
      position: absolute;
      bottom: 0;
      height: 30px;
      padding: 10px 0;
      width: 100%;
      z-index: 3;
      .btn-group {
        display: flex;
        a {
          flex: 20%;
          color: #fff;
        }
        h4 {
          font-size: 14px;
          margin: 0;
          line-height: 1;
        }
      }
    }
  }
</style>
