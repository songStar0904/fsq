<template>
<div>
<div v-title style="display:none;">湘潭福盛全官网 - 首页</div>
	<el-carousel height="450px" :interval="5000" @change="handleChange" >
    <el-carousel-item v-for="(item, index) in carouselList" :key="index">
    <img :src="item.img" class="carousel-img" alt="">
    <a :href="item.link">
    <div class="txt-box" ref="txtBox" :class="{active: index==current}">
      <h1 class="carousel-name" >{{ item.title }}</h1>
      <h2 class="carousel-title">{{ item.subtitle }}</h2>
      </div>
      </a>
    </el-carousel-item>
  </el-carousel>
   
  <div class="services-box panel-box">
  <services-box></services-box>
  </div>
  <div class="goods-box">
    <goods-spread :title="goodsTitle"></goods-spread>
  </div>
  <div class="news-box">
  <el-row :gutter="0"  type="flex" justify="space-around">
    <el-col :xs="24" :sm="24" :md="18" :lg="15">
<title-panel class="panel-box" :title="newsTitle" :subtitle="newsSubtitle"></title-panel>
  <news-box></news-box>
  </el-col>
  </el-row>
  </div>
  <about-home></about-home>
  <div class="link-box panel-box">
    <transition name="custom-classes-transition"
    enter-active-class="animated fadeInUpBig">
<title-panel :title="linkTitle" :subtitle="linkSubtitle"></title-panel>
</transition>
  <transition name="el-zoom-in-center">
  <friendly-link></friendly-link>
  </transition>
  </div>
  </div>
  </template>
<script>
import {servicesBox, newsBox, friendlyLink, aboutHome, goodsSpread} from '@/components'
import {titlePanel} from '@/components/common'
export default {
  name: 'home',
  props: {
    top: {
      type: Number
    }
  },
  data () {
    return {
      msg: 'this is home',
      goodsTitle: '热门推荐',
      newsTitle: '新闻资讯',
      newsSubtitle: '新鲜事，简单报',
      linkTitle: '合作伙伴',
      linkSubtitle: '加强企业合作，实现共同进步',
      carouselList: [],
      current: 0,
      seTop: 0
    }
  },
  mounted () {
    this.getSlider()
    setTimeout(function () {
      this.seTop = this.$refs
    }, 0)
    // console.log(this.$refs)
  },
  methods: {
    handleChange (prev, index) {
      this.current = prev
    },
    getSlider () {
      this.$fetch.slider.get()
        .then((res) => {
          if (res.status) {
            this.carouselList = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
    }
  },
  components: {
    servicesBox,
    newsBox,
    friendlyLink,
    titlePanel,
    aboutHome,
    goodsSpread
  }
}
</script>
<style type="text/css" rel="stylesheet/css" scoped>
  .el-carousel__container{
      position: relative;
  }
	.carousel-img{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.txt-box{
		position: absolute;
		width:500px;
		color: #fff;
		left: 50%;
		margin-left: -250px;
		top:50%;
		margin-top: -50px;
		text-align: center;
	}
	.carousel-name{
		opacity: 0;
		margin-top:30px;
		margin-bottom: 20px;
		transition: all .5s ease .8s;
    -moz-transition: all .5s ease .8s; /* Firefox 4 */
    -webkit-transition: all .5s ease .8s; /* Safari 和 Chrome */
    -o-transition: all .5s ease .8s; /* Opera */
	}
	.carousel-title{
		opacity: 0;
		margin-top:40px;
		transition: all 1s ease 1.4s;
    -moz-transition: all 1s ease 1.4s; /* Firefox 4 */
    -webkit-transition: all 1s ease 1.4s; /* Safari 和 Chrome */
    -o-transition: all 1s ease 1.4s; /* Opera */	
	}
	.txt-box.active h1,.txt-box.active h2{
		opacity: 1;
		margin-top: 0;
	}
  .services-box{
    height: 271px;
  }
  .news-box{
    margin: 50px auto 0;
  }
  .goods-box{
    width: 1000px;
    margin: 0 auto;
  }
  .link-box{
    margin-top: 50px;
  }
</style>
