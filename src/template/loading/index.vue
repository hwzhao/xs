<template lang="html">
  <transition name="xs-load">
    <div class="xs-loading-toast" v-if="show">
      <div class="xs-mask"></div>
      <div class="xs-toast">
        <i class="xs-toast-icon xs-icon" :class="'xs-icon-loading' + icon"></i>
        <p class="xs-toast-content">{{content}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'xs-loading',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    icon: {
      default: 3
    },
    content: {
      type: String,
      default: '加载中'
    }
  }
}
</script>

<style lang="scss">
.xs-loading-toast {
  position: relative;
  .xs-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 999;
  }
  .xs-toast {
    position: fixed;
    background-color: rgba(17, 17, 17, 0.7);
    width: 120px;
    height: 120px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    color: #fff;
    z-index: 1000;
    border-radius: 5px;
  }
  .xs-toast-icon {
    margin: 25px 0;
    display: block;
    &:before {
      display: block;
      font-size: 20px;
      animation: xsLoadinng 1s infinite linear;
    }
  }
  .xs-icon-loading1, .xs-icon-loading2 {
    &:before {
      animation: xsLoadinng1 2s infinite linear;
    }
  }
  .xs-toast-content {
    font-size: 18px;
  }
}
@keyframes xsLoadinng {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes xsLoadinng1 {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
