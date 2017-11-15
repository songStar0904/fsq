<template>
<section>
<!-- <p>{{lensLeft}}</p><p>{{wrapLeft}}</p> -->
  <div class="wrap" ref="wrap"  @mouseover="showLens=true" @mouseout="showLens=false" @mousemove="doMouseMove($event)">
  	<ul class="goods-img" :style="{marginLeft: toMove + 'px'}">
  		<li class="img-item" v-for="item in $style[currentStyle].img">
  			<img :src="item.url" alt="">
  		</li>
  	</ul>
  	<span class="img-lens" v-show="showLens==true" :style="{left: lensX+'px', top: lensY + 'px'}"></span>
  </div>
  <div class="page">
  	<div class="page-item" v-for="(item, index) in $style[currentStyle].img" @mouseover="toGo(index)" :class="{actived:current===index}">
  	<span class="arrow"></span>
  		<img :src="item.url" alt="">
  	</div>
  </div>
  <transition name="el-fade-in-linear">
  <div class="bigImg" v-show="showLens">
  <img :src="$style[currentStyle].img[current].url" alt="" :style="{left: bigLeft+'px', top: bigTop + 'px'}">
  </div>
  </transition>
 </section>
</template>
<script>
export default{
  props: ['$style', 'currentStyle', 'el'],
  data () {
    return {
      // 放大倍数
      scale: 2,
      current: 0,
      toMove: 0,
      showLens: false,
      offsetX: 0,
      offsetY: 0,
      lensLeft: 0,
      lensTop: 0,
      wrapWidth: 400,
      wrapHeight: 450,
      wrapLeft: 0,
      wrapTop: 500,
      currentImg: '',
      bigLeft: 0,
      bigTop: 0,
      show: false
    }
  },
  watch: {
    $style () {
      this.show = true
    }
  },
  computed: {
    lensX () {
      if (this.lensLeft < 0) {
        return 0
      } else if (this.lensLeft > this.wrapWidth / 2) {
        return this.wrapWidth / 2
      } else {
        return this.lensLeft
      }
    },
    lensY () {
      if (this.lensTop < 0) {
        return 0
      } else if (this.lensTop > this.wrapHeight / 2) {
        return this.wrapHeight / 2
      } else {
        return this.lensTop
      }
    }
  },
  mounted () {
    this.init()
    window.onresize = () => {
      this.init()
    }
  },
  methods: {
    init () {
      let rect = this.$refs.wrap.getBoundingClientRect()
      this.wrapWidth = rect.width
      this.wrapHeight = rect.height
      this.wrapLeft = rect.left
      this.wrapTop = rect.top
    },
    toGo (index) {
      this.current = index
      this.toMove = -this.current * this.wrapWidth
    },
    doMouseMove (e) {
      console.log(e)
      this.offsetX = e.pageX - this.wrapLeft
      this.offsetY = e.pageY - this.wrapTop
      this.lensLeft = this.offsetX - this.wrapWidth / 4
      this.lensTop = this.offsetY - this.wrapHeight / 4
      this.moveBigImg()
    },
    moveBigImg () {
      this.bigLeft = -this.lensX * 2
      this.bigTop = -this.lensY * 2
    }
  }
}
</script>
<style scoped>
  section{
    position: relative;
    display: inline-block;
  }
  section .wrap{
  	width: 400px;
  	height: 450px;
  	overflow: hidden;
  	position: relative;
  }
  section .bigImg{
  	width: 400px;
  	height: 450px;
  	position: absolute;
  	overflow: hidden;
  	left: 480px;
  	top: 0;
    z-index: 10000;
  }
  section .bigImg img{
  	position: absolute;
  	width: 800px;
  	height: 900px;
  }
  section .img-lens{
  	position: absolute;
  	width: 50%;
  	height: 50%;
    background: url(https://img-tmdetail.alicdn.com/tps/i4/T12pdtXaldXXXXXXXX-2-2.png) repeat scroll 0 0 transparent;
    top: 0;
    left: 0;
    cursor: move;
  }
  section .wrap ul{
  	width: 20000px;
  	height: 100%;
  	transition: margin-left 0.5s ease;
  }
  section .wrap ul li{
  	float: left;
  	width: 400px;
  	height: 100%;
  }
  section .page{
  	width: 400px;
  	height: 60px;
  	margin-top: 10px;
  }
  section .page .page-item.actived{
  	border-color: #13CE66;
  	width: 50px;
  	height: 50px;
  }
  section .page .page-item{
  	position: relative;
  	width: 50px;
  	height: 50px;
  	float: left;
  	border: 3px solid transparent;
  	margin-right: 6px;
  }
  section .page .page-item.actived .arrow{
  	display: inline;
  }
  section .page .page-item .arrow{
  	width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #13CE66 transparent;
    line-height: 0px;
    _border-color: #000000 #000000 #13CE66 #000000;
    position: absolute;
    left: 50%;
    margin-left: -5px;
    top: -8px;
    display: none;
  }
</style>
