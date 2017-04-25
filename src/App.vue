<template>
  <div id="app">
    <router-view></router-view>
    <loading :show="loading.show" :icon="loading.icon" :content="loading.content"></loading>
  </div>
</template>

<script>
import loading from '@/template/loading/index'
export default {
  name: 'app',
  components: {
    loading
  },
  data () {
    return {
      loading: {
        show: false,
        icon: 1,
        content: '加载中'
      }
    }
  }
}
</script>

<style lang="scss">
@import "styles/iconfont.css";
@import "styles/style.scss";
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
