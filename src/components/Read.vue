<template lang="html">
  <div class="read-view">
    <div class="head">
      {{read.tocContent.title}}
    </div>
    <div class="read-content" :style="{'font-size': `${fz}px`}">
      <article >
        <section class="read" v-tocContent="{'methods': getCount}" v-html="read.tocContent.body" :style="readStyle" >
        </section>
      </article>
    </div>
    <div class="action-view">
      <div class="left" @click="page = page - 1">

      </div>
      <div class="center" @click.stop="fz = fz * 1.1">

      </div>
      <div class="right" @click="page = page + 1">

      </div>
    </div>
    <div class="count" >
      {{page}}/ {{count}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'read',
  computed: {
    ...mapState({
      'read': state => state.read
    }),
    readStyle () {
      return {
        'transform': `translateX(-${(this.page - 1) * this.clientWidth}px)`,
        'transition': (this.page > 1) ? 'all .3s' : 'none'
      }
    }
  },
  directives: {
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
      page: 1,
      count: 1,
      clientWidth: '',
      fz: 14,
      lg: 1.2,
      bc: '#123',
      tocs: []
    }
  },
  methods: {
    getCount (count, width) {
      this.count = count
      this.clientWidth = width
    },
    getConent (id, callback, from) {
      this.$http.get('https://xs.htmlbiji.com/index.php', {
        params: {
          chapter: 1,
          url: `/chapter/${this.tocs[id].link}?k=2124b73d7e2e1945&t=1468223717`
        }
      })
      .then(function (response) {
        if (callback && typeof callback === 'function') {
          callback(response.data)
        }
      })
    }
  },
  watch: {
    page (value) {
      if (value === 0) {
        // 上一章
        /*
        if (！this.read.preContent) {
          获取上一张
        }
        设置上一章节为当前章节
        */
        this.$store.commit('setRead', {
          'preContent': '',
          'tocContent': this.read.preContent,
          'nextContent': this.read.tocContent,
          tocId: this.read.tocId - 1
        })
        this.page = 1
      } else if (value > this.count) {
        // 下一章
        /*
        if (！this.read.nextContent) {
          获取下一张
        }
        设置下一章节为当前章节
        */
        this.$store.commit('setRead', {
          'preContent': this.read.tocContent,
          'tocContent': this.read.nextContent,
          'nextContent': '',
          tocId: this.read.tocId + 1
        })
        this.page = 1
      }
      this.$store.commit('setRead', {
        page: value
      })
    },
    'read.tocId' (value) {
      // 检查是否有上一章和下一章 如果没有则获取
      if (value >= 0) {
        const self = this
        if (!this.read.preContent) {
          this.getConent(value - 1, function (response) {
            self.$store.commit('setRead', {
              'preContent': response.chapter
            })
          }, 'pre')
        }
        if (!this.read.nextContent) {
          this.getConent(value + 1, function (response) {
            self.$store.commit('setRead', {
              'nextContent': response.chapter
            })
          }, 'next')
        }
      }
    },
    'read.tocContent' (value) {
      if (value === '' || !value.body) {
        const self = this
        self.$store.commit('setRead', {
          'tocContent': {
            'body': '加载中'
          }
        })
        this.getConent(this.read.tocId, function (response) {
          self.$store.commit('setRead', {
            'tocContent': response.chapter
          })
        }, 'next')
      }
    }
  },
  created () {
    if (window.localStorage.getItem('read') === null) {
      this.$router.push('/Search')
    }
    this.$store.commit('setRead', JSON.parse(window.localStorage.getItem('read')))
    const self = this
    this.$http.get(`https://xs.htmlbiji.com/index.php`, {
      params: {
        'url': `/mix-toc/${this.read.id}`
      }
    })
    .then(function (response) {
      self.tocs = response.data.mixToc.chapters
      self.getConent(self.read.tocId, function (response) {
        self.$store.commit('setRead', {
          'tocContent': response.chapter
        })
      }, 'first')
      self.page = self.read.page
    })
  }
}
</script>

<style lang="scss" scoped>
  .read-view {
    .head {
      position: fixed;
      top: 0;
      width: 100%;
      height: 30px;
    }
    .read-content {
      position: absolute;
      top: 30px;
      bottom: 10px;
      overflow: hidden;

      article {
        height: 100%;
        margin: 0 16px;
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
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }
</style>
