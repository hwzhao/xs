<template>
  <div class="info">
    <header class="header after-boeder">
      <a @click='$router.back()' class="xs-icon xs-icon-back"></a>
      <span>图书详情</span>
    </header>
    <div class="content">
      <div class="basic">
        <img :src="info.cover | cover" alt="">
		<div class="basic-info">
			<span class="title">{{info.title}}</span>
			<span class="author">作者：{{info.author}}</span>
			<span class="word">字数：{{info.wordCount}}   {{info.isSerial ? '连载中' : '已完结'}}</span>
			<span class="cate">{{info.majorCate}}/ {{info.minorCate}}</span>
		</div>
      </div>
	  <div class="action">
       <div class="">
       	<a href="#">分享</a>
       </div>
	   <div class="">
       	<a href="#">目录</a>
       </div>
	  </div>
	  <div class="intro">
	  	{{info.longIntro}}
	  </div>
	  <div class="update">
		  {{info.updated}}更新{{info.lastChapter}}
	  </div>
    </div>
    <div class="footer before-border">
      <div class="footer-item">
        <a class="xs-btn">加入书架</a>
      </div>
      <div class="footer-item">
        <a class="xs-btn">开始阅读</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  data () {
    return {
      info: '图书详情'
    }
  },
  created () {
    const self = this
    this.$http.get(`/api/book/${this.$route.params.id}`)
    .then(function (response) {
      self.info = response.data
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
        padding: 0 13px;
        color: #686868
      }
      p {
      	text-align: center;
      }
    }
    .content {
    	padding-top: 50px;
		padding-bottom: 50px;
    }
    .footer {
      position: fixed;
      display: flex;
	  background-color: #fff;
      bottom: 0;
      height: 50px;
      width: 100%;
      line-height: 50px;
      .footer-item {
        flex: 1;
        display: inline-block;
        .xs-btn {
          background-color: $default-color;
          padding: 10px 30px;
          color: #fff;
		  border-radius: 20px;
        }
      }
    }
</style>
